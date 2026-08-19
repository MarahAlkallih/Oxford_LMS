// 


// 💡 إرسال التنبيهات في عنوان تبويب المتصفح (Browser Tab Badge)
// بالنسبة لملاحظتك عن إظهار عدد الإشعارات غير المقروءة في تبويب المتصفح (Browser Title): يمكنك إضافة هذا السطر البسيط داخل مكون رئيسي أو صفحة الداشبورد:

// TypeScript
// import { useEffect } from "react";

// // داخل المكون الرئيسي:
// const { data: unreadData } = useGetUnreadCountQuery();

// useEffect(() => {
//   const count = unreadData?.unreadCount ?? 0;
//   if (count > 0) {
//     document.title = `(${count}) مشروعك - الإشعارات`;
//   } else {
//     document.title = "مشروعك";
//   }
// }, [unreadData]);