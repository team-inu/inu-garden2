import { DialogClose } from '@radix-ui/react-dialog';

import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useStrictForm } from '@/hooks/form-hook';
import {
  EditEnrollmentDefaultValues,
  EditEnrollmentForm,
  EditEnrollmentFormSchema,
} from '@/types/schema/enrollment-schema';

type EnrollmentDialogProps = {
  onSubmit: (values: EditEnrollmentForm) => void;
  defaultValues?: EditEnrollmentForm;
};

const EnrollmentEditDialog: React.FC<EnrollmentDialogProps> = ({
  onSubmit,
  defaultValues,
}) => {
  const form = useStrictForm(
    EditEnrollmentFormSchema,
    defaultValues ?? EditEnrollmentDefaultValues,
  );

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Enrollment</DialogTitle>
          <DialogDescription>Edit the enrollment information</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>StudentId</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input {...field} disabled />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <DialogClose asChild>
            <Button onClick={() => form.reset()} variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" onClick={form.handleSubmit(onSubmit)}>
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default EnrollmentEditDialog;