import type { HTMLProps } from 'react';
import React from 'react';
import cn from 'classnames';

import classes from './TableRow.module.css';
import { useTableContext, useTableRowTypeContext, Variant } from './Context';

export interface RowData {
  [x: string]: string;
}

export interface TableRowProps
  extends Omit<
    HTMLProps<HTMLTableRowElement>,
    'onClick' | 'tabIndex' | 'onKeyUp'
  > {
  children?: React.ReactNode;
  rowData?: RowData;
}

export const TableRow = ({
  children,
  rowData,
  className,
  ...tableRowProps
}: TableRowProps) => {
  const { variantStandard } = useTableRowTypeContext();
  const { onChange, selectedValue, selectRows } = useTableContext();
  const handleClick = () => {
    if (
      onChange != undefined &&
      selectRows &&
      variantStandard === Variant.Body &&
      rowData
    ) {
      onChange({ selectedValue: rowData });
    }
  };
  const isSelected =
    selectRows &&
    typeof rowData !== 'undefined' &&
    JSON.stringify(rowData) === JSON.stringify(selectedValue);

  return (
    <tr
      tabIndex={variantStandard === Variant.Body ? -1 : 0}
      {...tableRowProps}
      className={cn(
        classes.TableRow,
        {
          [classes['table-row--selected']]: isSelected,
          [classes['table-row--body']]:
            variantStandard === Variant.Body && selectRows && !isSelected,
        },
        className,
      )}
      onClick={handleClick}
    >
      {children}
    </tr>
  );
};
