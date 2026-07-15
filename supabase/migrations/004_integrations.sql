-- Add integration settings for n8n + Wapolit
INSERT INTO store_settings (key, value) VALUES
  ('wapolit_api_key', ''),
  ('wapolit_device_id', ''),
  ('n8n_webhook_url', ''),
  ('n8n_webhook_secret', ''),
  ('payment_url', 'https://pay.example.com')
ON CONFLICT (key) DO NOTHING;
