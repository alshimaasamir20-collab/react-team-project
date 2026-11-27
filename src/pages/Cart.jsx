import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';

const initialItems = [
  { id: 1, name: 'Classic T-Shirt', price: 25, quantity: 2, icon: '👕' },
  { id: 2, name: 'Everyday Backpack', price: 48, quantity: 1, icon: '🎒' },
  { id: 3, name: 'Sport Sneakers', price: 72, quantity: 1, icon: '👟' },
];

function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}

export default function Cart() {
  const [items, setItems] = useState(initialItems);
  const [notice, setNotice] = useState('');

  function changeQuantity(id, amount) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item,
      ),
    );
  }

  function removeItem(id) {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  }

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0,
  );

  return (
    <main className="space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Shopping Cart</h1>
        <p className="mt-1 text-sm text-slate-500">
          Review the products in your cart.
        </p>
      </header>

      {items.length === 0 ? (
        <section className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <ShoppingBag className="mx-auto text-slate-400" size={40} />
          <h2 className="mt-4 text-lg font-semibold text-slate-800">
            Your cart is empty
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Removed products will no longer appear here.
          </p>
        </section>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <section className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="flex flex-wrap items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
              >
                <div
                  className="flex h-20 w-20 items-center justify-center rounded-lg bg-indigo-50 text-3xl"
                  aria-label={`${item.name} image placeholder`}
                >
                  {item.icon}
                </div>

                <div className="min-w-32 flex-1">
                  <h2 className="font-semibold text-slate-800">{item.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {formatPrice(item.price)}
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-lg border border-slate-200 p-1">
                  <button
                    type="button"
                    onClick={() => changeQuantity(item.id, -1)}
                    disabled={item.quantity === 1}
                    aria-label={`Decrease quantity of ${item.name}`}
                    className="rounded p-1 text-slate-600 hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="min-w-5 text-center text-sm font-medium">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => changeQuantity(item.id, 1)}
                    aria-label={`Increase quantity of ${item.name}`}
                    className="rounded p-1 text-slate-600 hover:bg-slate-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <p className="w-20 text-right font-semibold text-slate-800">
                  {formatPrice(item.price * item.quantity)}
                </p>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label={`Remove ${item.name}`}
                  className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 size={18} />
                </button>
              </article>
            ))}
          </section>

          <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-5 flex justify-between text-sm text-slate-600">
              <span>Items ({itemCount})</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 font-semibold text-slate-900">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>

            <button
              type="button"
              onClick={() => setNotice('Checkout will be added later.')}
              className="mt-5 w-full rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Continue to Checkout
            </button>

            {notice && (
              <p role="status" className="mt-3 text-center text-sm text-slate-500">
                {notice}
              </p>
            )}
          </aside>
        </div>
      )}
    </main>
  );
}
