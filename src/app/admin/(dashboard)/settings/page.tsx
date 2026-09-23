import { getSiteSettings } from "@/lib/data/siteSettings";
import { USE_DB } from "@/lib/db";
import SiteSettingsForm from "@/components/admin/SiteSettingsForm";

export default async function AdminSettingsPage() {
  const settings = await getSiteSettings();

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-navy-950">Homepage Settings</h1>
      <p className="mt-1 text-sm text-stone-600">
        Edit the hero section and choose which sections appear on the homepage.
      </p>

      {!USE_DB && (
        <p className="mt-4 text-sm text-gold-600">
          No database connected — connect one to edit these settings.
        </p>
      )}

      <div className="mt-8 max-w-2xl">
        <SiteSettingsForm settings={settings} />
      </div>
    </div>
  );
}
