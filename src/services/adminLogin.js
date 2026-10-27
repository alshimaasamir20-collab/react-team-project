// الكود بيعمل إيه؟
// - بيبعت الإيميل والباسورد إلى /auth/login.
// - بيستقبل الـToken وبيتحقق إن الحساب دوره admin.
// - بيحفظ الـToken عشان ملف Axios يبعته تلقائيًا مع الطلبات التالية.
// مهم: لو الـLogin نجح لكن الحساب مش Admin، الكود مش هيحفظ الـToken. ولو السيرفر بيرجع الدور بصيغة مختلفة، هنراجع الـResponse بدل ما نفترض.



import api from "./api";

export async function adminLogin(email, password) {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  const { token, user } = response.data;

  if (user?.role !== "admin") {
    throw new Error("This account is not an admin");
  }

  localStorage.setItem("token", token);

  return user;
}
