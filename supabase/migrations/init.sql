-- ========================================
-- قاعدة بيانات متجر واتساب
-- WhatsApp Store Database
-- ========================================

-- 1. جدول المنتجات
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. جدول الطلبات
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_phone TEXT NOT NULL,
  product_id UUID REFERENCES products(id),
  product_name_snapshot TEXT NOT NULL,
  price_snapshot DECIMAL(10,2) NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'cancelled')),
  payment_method TEXT DEFAULT 'cash' CHECK (payment_method IN ('cash', 'electronic')),
  payment_link TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Indexes للبحث السريع
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_orders_phone ON orders(customer_phone);
CREATE INDEX idx_orders_status ON orders(status);

-- 4. تفعيل Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 5. سياسات المنتجات
-- أي حد يقدر يقرأ المنتجات (عشان الكتالوج)
CREATE POLICY "products_public_read" ON products
  FOR SELECT USING (true);

-- بس المسجل (الأدمن) يقدر يضيف/يعدل/يحذف
CREATE POLICY "products_admin_insert" ON products
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "products_admin_update" ON products
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "products_admin_delete" ON products
  FOR DELETE USING (auth.role() = 'authenticated');

-- 6. سياسات الطلبات
-- بس المسجل (الأدمن) يقدر يشوف الطلبات
CREATE POLICY "orders_admin_select" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');

-- 7. دالة لتحديث updated_at تلقائي
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- 8. Storage bucket لصور المنتجات
-- هنضيفه من واجهة Supabase:
-- Storage → Create bucket → product-images → Public bucket
