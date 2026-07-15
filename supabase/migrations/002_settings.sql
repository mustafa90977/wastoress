CREATE TABLE store_settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "settings_public_read" ON store_settings
  FOR SELECT USING (true);

CREATE POLICY "settings_admin_all" ON store_settings
  FOR ALL USING (auth.role() = 'authenticated');

CREATE TRIGGER settings_updated_at
  BEFORE UPDATE ON store_settings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

INSERT INTO store_settings (key, value) VALUES
  ('store_name', 'متجر النخبة'),
  ('hero_title', 'تسوق بسهولة عبر واتساب'),
  ('hero_subtitle', 'استمتع بتجربة تسوق فريدة ومبسطة. اختر منتجاتك المفضلة وسنقوم بإتمام طلبك مباشرة عبر محادثة واتساب سريعة ومباشرة مع فريقنا.'),
  ('about_text', 'نحن نوفر لك أرقى المنتجات العالمية بلمسة عربية أصيلة. تجربة تسوق استثنائية تبدأ من هنا.'),
  ('phone', '+966 500 000 000'),
  ('email', 'info@al-nukhba.com'),
  ('address', 'الرياض، المملكة العربية السعودية'),
  ('categories', '[{"name":"عطور","icon":"spa"},{"name":"أزياء","icon":"styler"},{"name":"ساعات","icon":"watch"},{"name":"عناية","icon":"spa"},{"name":"هدايا","icon":"redeem"}]'),
  ('trust_badges', '[{"title":"شحن سريع","desc":"توصيل لكافة المناطق في زمن قياسي","icon":"local_shipping"},{"title":"دفع آمن","desc":"طرق دفع متعددة ومؤمنة بالكامل","icon":"verified_user"},{"title":"منتجات مميزة","desc":"تشكيلة مختارة بعناية لأصحاب الذوق الرفيع","icon":"workspace_premium"},{"title":"ضمان الجودة","desc":"نضمن لك أفضل جودة لجميع مشترياتك","icon":"verified"}]'),
  ('testimonials', '[{"name":"أحمد العتيبي","review":"تجربة تسوق رائعة جداً، الطلب عبر واتساب سهل علي الكثير من الوقت والتوصيل كان سريعاً جداً.","rating":5},{"name":"سارة القحطاني","review":"المنتجات جودتها ممتازة وتغليفها فاخر جداً، بالتأكيد لن تكون المرة الأخيرة التي أطلب فيها.","rating":5},{"name":"فهد الحربي","review":"دعم فني متميز واستجابة سريعة جداً عبر الواتساب. أنصح الجميع بالتعامل مع متجر النخبة.","rating":4}]'),
  ('footer_text', 'جميع الحقوق محفوظة');
