import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectNumbers } from '@/lib/dbTables/tableNumbers';
import { deleteProduct } from '../actions';

export function PhoneNumber({ number }: { number: SelectNumbers }) {
  return (
    <TableRow>
      <TableCell className="font-medium">{number.number}</TableCell>
      <TableCell>
        <Badge variant="outline" className="capitalize">
          {number.number}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">{`$${number.number}`}</TableCell>
      <TableCell className="hidden md:table-cell">{number.number}</TableCell>
      <TableCell className="hidden md:table-cell">
        {
          //number.number.toLocaleDateString('en-US')
        }
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
