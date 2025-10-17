export interface SaleInvoiceDto {
  id: number;
  invoiceNumber: string;
  customerName: string;
  userId: number;
  createdAt: string;
  items: InvoiceItem[];
}

export interface InvoiceItem {
  id: number;
  productCode: string;
  productName: string;
  materialGroup: string;
  quantity: number;
  unitPrice: string;
  totalPrice: string;
}
