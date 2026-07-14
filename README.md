# متجر واتساب - WhatsApp Store

متجر إلكتروني بسيط مع كتالوج منتجات وطلب عبر واتساب، وداشبورد أدمن لإدارة المنتجات والطلبات.

## المكونات

- **Next.js 15** (App Router) - مستضاف على Vercel
- **Supabase** - قاعدة بيانات، Auth، تخزين صور
- **n8n** - أتمتة معالجة طلبات واتساب
- **Wapolit** - بوابة واتساب API

## هيكل المشروع

```
src/
├── app/
│   ├── page.tsx                    # الكتالوج العام
│   ├── admin/
│   │   ├── login/page.tsx          # تسجيل دخول الأدمن
│   │   ├── products/page.tsx       # قائمة المنتجات
│   │   ├── products/new/page.tsx   # إضافة منتج
│   │   ├── products/[id]/edit/     # تعديل منتج
│   │   └── orders/page.tsx         # قائمة الطلبات
├── components/
│   ├── product-card.tsx
│   ├── product-grid.tsx
│   ├── product-form.tsx
│   ├── admin-header.tsx
│   └── empty-state.tsx
├── lib/
│   └── supabase.ts                 # كلائنات Supabase
├── middleware.ts                   # حماية صفحات الأدمن
└── types/
    └── database.ts                 # أنواع TypeScript
```

## خطوات النشر

### 1. Supabase
1. اعمل حساب على [supabase.com](https://supabase.com)
2. أنشئ مشروع جديد
3. افتح **SQL Editor** والصق محتوى `supabase/migrations/init.sql`
4. شغّل الـ SQL
5. **Authentication → Settings**: شغّل Email/Password (أطفئ Confirm Email)
6. **Authentication → Users**: ضيف الأدمن (إيميل + باسورد)
7. **Storage → Create bucket**: اسمه `product-images`، عام (Public)
8. **Project Settings → API**: خذ الـ URL, Anon Key, Service Role Key

### 2. Vercel
1. ارفع الكود على [GitHub](https://github.com)
2. افتح [vercel.com](https://vercel.com) → Import من GitHub
3. أضف المتغيرات البيئية من `.env.example`
4. Deploy

### 3. n8n
1. افتح n8n (سحابي أو محلي)
2. استورد ملف `n8n-workflow.json`
3. عدّل المتغيرات البيئية في n8n (SUPABASE_URL, SUPABASE_SERVICE_KEY, CATALOG_URL, PAYMENT_URL, WAPOLIT_API_URL, WAPOLIT_API_KEY)
4. فعّل الـ Webhook workflow

### 4. Wapolit
1. اعمل حساب على Wapolit
2. ضيف رقم واتسابك
3. حط Webhook URL → رابط webhook بتاع n8n

## المتغيرات البيئية

افتح `.env.example` وعبّي القيم المطلوبة، ثم ضيفها في Vercel.

## التطوير محليًا

```bash
npm install
npm run dev
```

المشروع هيفتح على `http://localhost:3000`
