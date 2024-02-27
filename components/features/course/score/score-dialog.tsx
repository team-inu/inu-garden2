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
  CreateScoreForm,
  CreateScoreFormDefaultValues,
  CreateScoreFormSchema,
} from '@/types/schema/score-schema';

type ScoreDialogProps = {
  onSubmit: (values: CreateScoreForm) => void;
  defaultValues?: CreateScoreForm;
  isEdit?: boolean;
};

const ScoreDialog: React.FC<ScoreDialogProps> = ({
  onSubmit,
  defaultValues,
  isEdit = false,
}) => {
  const form = useStrictForm(
    CreateScoreFormSchema,
    defaultValues ?? CreateScoreFormDefaultValues,
  );

  return (
    <div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Score' : 'Add Score'}</DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Edit the score information'
              : 'Fill in the score information'}
          </DialogDescription>
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
                      <Input {...field} />
                      <FormMessage />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scores</FormLabel>
                  <FormControl>
                    <div className="flex flex-col space-y-3">
                      <Input {...field} type="number" min={0} max={100} />
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
            {isEdit ? 'Edit' : 'Add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default ScoreDialog;
