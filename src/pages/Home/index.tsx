import { AlertCircle } from 'lucide-react';
import { useState, useRef } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/Shadcn/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/Shadcn/card';
import { Button } from '@/components/Shadcn/button';
import { Alert, AlertDescription } from '@/components/Shadcn/alert';
import ExcelUploader from '@/components/BaseComponents/ExcelUploader';

interface ExcelData {
  [key: string]: string;
}

function HomePage() {
  const [data, setData] = useState<ExcelData[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const clearData = () => {
    setData([]);
    setHeaders([]);
    setFileName('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="px-10 py-3 flex flex-1 flex-col">
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio,
        autem adipisci molestiae eaque ut fugiat ipsam itaque voluptatum,
        dolore, accusantium quod nesciunt tempora reprehenderit recusandae
        optio? Iure natus non molestias!
      </p>
      <div className="flex items-center gap-4 flex-col sm:flex-row">
        <ExcelUploader />
        {fileName && (
          <span className="text-sm text-muted-foreground">
            Selected: {fileName}
          </span>
        )}
        {data.length > 0 && (
          <Button
            onClick={clearData}
            variant="outline"
            className="border border-gray-300 rounded-md px-2 py-1 text-sm"
          >
            Clear
          </Button>
        )}
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="mt-4 flex-1 flex flex-col min-h-0">
        {data.length > 0 && (
          <Card className="flex-1 flex flex-col min-h-0">
            <CardHeader>
              <CardTitle>Excel Data</CardTitle>
              <CardDescription>
                Showing {data.length} rows from {fileName}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
              <div className="rounded-md border flex-1 overflow-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      {headers.map((header, index) => (
                        <TableHead key={index} className="font-semibold">
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.map((row, rowIndex) => (
                      <TableRow key={rowIndex}>
                        {headers.map((header, colIndex) => (
                          <TableCell key={colIndex}>
                            {row[header]?.toString() || ''}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default HomePage;
