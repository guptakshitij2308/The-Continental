import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCabin } from "../../services/apiCabins.js";
import { useQueryClient } from "@tanstack/react-query";
import FormRow from "../../ui/FormRow.jsx";

function CreateCabinForm() {
  const { handleSubmit, register, reset, getValues, formState } = useForm(); // using get values we can get access to the values submitted in the react hook form.
  // using formState we can access to all the errors which we are logging in the console.
  const { errors } = formState;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("Cabin has been created successfully.");
      queryClient.invalidateQueries({
        queryKeys: ["cabins"],
      });
      reset();
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  function onSubmit(data) {
    // console.log(data);
    mutate(data);
  }

  function onError(errors) {
    // console.log(errors);
  }

  // console.log(isPending);
  console.log(getValues?.regularPrice);

  return (
    // Each time we submit our form , onSubmit function will be called by react query form ; In case any of the valudations fail , onError function will be called
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Maximum Capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "The cabin capacity must be at least 1 guest.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular Price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          {...register("regularPrice", {
            required: "This field is required",
            min: {
              value: 1,
              message: "The cabin price must be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than regular price.",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          disabled={isPending}
          defaultValue=""
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput id="image" accept="image/*" disabled={isPending} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isPending}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
