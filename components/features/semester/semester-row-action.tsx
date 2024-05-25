'use client';

import { DialogClose } from '@radix-ui/react-dialog';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { Row } from '@tanstack/react-table';
// TODO: make it dynamic
import { useState } from 'react';

import SemesterDialog from '@/components/features/semester/semester-dialog';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useDeleteSemester, useUpdateSemester } from '@/hooks/semester-hook';
import { SemesterSchema, UpdateSemesterForm } from '@/types/schema/semsester-schema';

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function SemesterRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const semester = SemesterSchema.parse(row.original);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { mutate: deleteSemester, isError: isDeleteError } = useDeleteSemester();
  const { mutate: updateSemester, isError: isUpdateError } = useUpdateSemester();

  const onSubmit = (values: UpdateSemesterForm) => {
    const result = {
      semester: {
        semesterSequence: values.semesterSequence,
        year: values.year,
      },
      id: semester.id,
    };
    updateSemester(result);
    if (!isUpdateError) {
      setIsEditDialogOpen(false);
    }
  };

  const onDelete = () => {
    deleteSemester(semester.id);
    if (!isDeleteError) {
      setIsDeleteDialogOpen(false);
    }
  };

  return (
    <Dialog
      open={isEditDialogOpen || isDeleteDialogOpen}
      onOpenChange={isEditDialogOpen ? setIsEditDialogOpen : setIsDeleteDialogOpen}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <DotsHorizontalIcon className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>Edit</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDeleteDialogOpen(true)}>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditDialogOpen && (
        <SemesterDialog
          isEdit
          onSubmit={onSubmit}
          defaultValues={{
            semesterSequence: semester.semesterSequence,
            year: semester.year,
          }}
        />
      )}

      {isDeleteDialogOpen && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are your sure to delete?</DialogTitle>
            <DialogDescription>{` You can't undo this action. This will permanently delete the.`}</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={onDelete}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}
