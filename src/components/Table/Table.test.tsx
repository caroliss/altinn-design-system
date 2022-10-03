import React from 'react';
import { render as renderRtl, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import type { TableProps } from './Table';
import { Table } from './Table';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

const render = (props: Partial<TableProps> = {}) => {
  const allProps = {
    children: (
      <>
        <TableHeader>
          <TableRow>
            <TableCell>Frukt</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow value='apple'>
            <TableCell>Apple</TableCell>
          </TableRow>
          <TableRow value='orange'>
            <TableCell>Orange</TableCell>
          </TableRow>
        </TableBody>
      </>
    ),
    onChange: jest.fn(),
    selectRows: true,
    selectedValue: '',
    ...props,
  };
  renderRtl(<Table {...allProps} />);
};

const user = userEvent.setup();

describe('Table', () => {
  it('should call handleChange with correct selectedValue when TableRow is clicked', async () => {
    const handleChange = jest.fn();
    render({ onChange: handleChange });

    await user.click(screen.getByRole('row', { name: 'Apple' }));
    expect(handleChange).toHaveBeenCalledWith({ selectedValue: 'apple' });
  });
});

describe('Table', () => {
  it('should call handleChange with correct selectedValue when one row is clicked by enter', async () => {
    const handleChange = jest.fn();
    render({ onChange: handleChange });

    await user.keyboard('{Tab}');
    await user.keyboard('{Enter}');
    expect(handleChange).toHaveBeenCalledWith({ selectedValue: 'apple' });
  });
});

it('should call handleChange when TableRow is clicked using key press Space', async () => {
  const handleClick = jest.fn();
  render({ onChange: handleClick });

  const Row = screen.getByRole('row', {
    name: 'Apple',
  });
  await user.type(Row, '{Space}');
  expect(handleClick).toHaveBeenCalledTimes(1);
});
