import Select from 'ui/components/select';
import { FILTER_TYPES, FilterType, SORT_ORDERS, SortOrder } from '../utils/useFilter';

interface FilterProps {
  type: FilterType;
  order: SortOrder;
  setType: (type: FilterType) => void;
  setOrder: (order: SortOrder) => void;
}

export function Filter({ type, order, setType, setOrder }: FilterProps) {
  return (
    <div>
      <Select
        name='Media Type'
        value={type}
        items={FILTER_TYPES.map((type) => ({ label: type, value: type }))}
        onChange={(value: FilterType) => setType(value)}
      />
      <Select
        name='Order'
        value={order}
        items={SORT_ORDERS.map((order) => ({ label: order, value: order }))}
        onChange={(value: SortOrder) => setOrder(value)}
      />
    </div>
  );
}
