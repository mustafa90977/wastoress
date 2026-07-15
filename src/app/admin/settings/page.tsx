import SettingsForm from "@/components/settings-form";

export default function AdminSettingsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-800">إعدادات المتجر</h1>
      <p className="mb-6 text-sm text-gray-500">تحكم في المعلومات التي تظهر في المتجر — النصوص، جهات الاتصال، الفئات، وآراء العملاء.</p>
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <SettingsForm />
      </div>
    </div>
  );
}
