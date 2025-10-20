export interface SaleInvoiceDto {
  id: number;
  invoiceNumber: string;
  customerName: string;
  customerCompanyName: string;
  customerTaxCode: string;
  userId: number;
  createdAt: string;
  items: SaleInvoiceItem[];
}

export interface SaleInvoiceItem {
  id: number;
  productCode: string;
  productName: string;
  materialGroup: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
}
