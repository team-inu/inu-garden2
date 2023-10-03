import { UseFormReturn, useFieldArray } from "react-hook-form";
import InputForm from "./input-form";
import { Button } from "@/components/ui/button";

type AssessmentSectionProps = {
  resultIndex: number;
  cloIndex: number;
  form: UseFormReturn<any>;
};

const AssessmentSection: React.FC<AssessmentSectionProps> = ({
  resultIndex,
  cloIndex,
  form,
}) => {
  const { control } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `resultForm[${resultIndex}].clo[${cloIndex}].assessment`,
  });
  return (
    <div className="flex space-x-5">
      <Button
        type="button"
        className="self-start"
        onClick={() => {
          append({});
        }}
      >
        เพิ่ม Ass
      </Button>
      <div className="space-y-5">
        {fields.map((field, index) => {
          return (
            <div
              key={field.id}
              className="flex space-x-5 justify-center items-center"
            >
              <InputForm
                name={`resultForm[${resultIndex}].clo[${cloIndex}].assessment[${index}].description`}
                lable="Assessment"
                placeholder="Please enter assessment"
                form={form}
              />
              <InputForm
                name={`resultForm[${resultIndex}].clo[${cloIndex}].assessment[${index}].percentagePredict`}
                lable="Expected Percentage"
                placeholder="Please enter expected percentage"
                form={form}
              />
              <InputForm
                name={`resultForm[${resultIndex}].clo[${cloIndex}].assessment[${index}].percentageActual`}
                lable="Actual Percentage"
                placeholder="Please enter actual percentage"
                form={form}
              />
              {fields.length > 1 && (
                <Button
                  type="button"
                  onClick={() => {
                    remove(index);
                  }}
                >
                  -
                </Button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssessmentSection;
