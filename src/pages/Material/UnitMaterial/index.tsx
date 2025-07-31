import { TableData } from '@/components/BaseComponents/TableData';
import { useUnitColumns } from './hooks';
import { mockUnits } from '@/mocks/UnitMaterial';

function UnitMaterial() {
  const { columns } = useUnitColumns();
  return (
    <div>
      Unit material
      <div className="mt-4">
        <TableData columns={columns} data={mockUnits} />
      </div>
    </div>
  );
}

export default UnitMaterial;
