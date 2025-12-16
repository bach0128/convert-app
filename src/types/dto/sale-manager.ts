import type { InvoiceItemType } from '@/models/invoice';

export interface SaleInvoiceDto {
  id: number;
  invoiceNumber: string;
  seller_name: string;
  seller_taxcode: string;
  seller_address: string;
  buyer_name: string;
  buyer_taxcode: string;
  buyer_address: string;
  userId: number;
  ngay_lap: string;
  has_adjustment: boolean;
  items_adjusted: SaleInvoiceItem[];
  total_amount_raw: number;
  total_amount_adjusted: number;
  adjustment_meta: {
    updated_by?: number;
    updated_at?: string;
    reason?: string;
  };
  items_raw: SaleInvoiceItem[];
}

export interface SaleInvoiceItem {
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

export interface CreateSaleInvoice {
  rows: ArrayLike<object>;
}

// format 1 đơn vị hàng hóa
// <TChat>1</TChat>
// <STT>1</STT>
// <THHDVu>Vận chuyển xe máy mang BKS 89B1-920.31</THHDVu>
// <DVTinh>Lần</DVTinh>
// <SLuong>1.000000</SLuong>
// <DGia>13889.000000</DGia>
// <TLCKhau>0.0000</TLCKhau>
// <STCKhau>0.000000</STCKhau>
// <ThTien>13889.000000</ThTien>
// <TSuat>8%</TSuat>
