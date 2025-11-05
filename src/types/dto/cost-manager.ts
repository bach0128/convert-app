export interface PurchaseInvoiceDto {
  id: number;
  invoiceNumber: string;
  sellerName: string;
  sellerTaxCode: string;
  sellerCompanyName: string;
  userId: number;
  createdAt: string;
  items: PurchaseInvoiceItem[];
}

export interface PurchaseInvoiceItem {
  id: number;
  productCode: string;
  productName: string;
  materialGroup: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface CreatePurchaseInvoice {
  sellerName: string;
  taxCode: string;
  sellerCompanyName: string;
  rows: ArrayLike<object>;
}
