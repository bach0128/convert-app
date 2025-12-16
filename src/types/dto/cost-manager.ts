import type { InvoiceItemType } from '@/models/invoice';

export interface PurchaseInvoiceDto {
  id: number;
  invoice_id: string;
  buyer_name: string;
  hd_type: string;
  hinh_thuc_tt: string;
  seller_name: string;
  seller_phone: number;
  seller_address: string;
  seller_taxcode: string;
  ngay_lap: string;
  has_adjustment: boolean;
  items_adjusted: PurchaseInvoiceItem[];
  total_amount_raw: number;
  total_amount_adjusted: number;
  adjustment_meta: {
    updated_by?: number;
    updated_at?: string;
    reason?: string;
  };
  items_raw: PurchaseInvoiceItem[];
}

export interface PurchaseInvoiceItem {
  STT: number;
  THHDVu: string;
  DVTinh: string;
  materialUnitId?: string;
  source: InvoiceItemType;
  SLuong: number;
  DGia: number;
  ThTien: number;
  original_index?: number;
  is_removed?: boolean;
}

export interface CreatePurchaseInvoice {
  rawData: string;
}
