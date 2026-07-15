import SettingsForm from "@/components/settings-form";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold text-gray-800">إعدادات المتجر</h1>
      <p className="mb-6 text-sm text-gray-500">تحكم في كل تفصيلة في المتجر — النصوص، الصور، التصنيفات، الشارات، العروض، واتساب، والتواصل الاجتماعي.</p>
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <SettingsForm />
      </div>
    </div>
  );
}
