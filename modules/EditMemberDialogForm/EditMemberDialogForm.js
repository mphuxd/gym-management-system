import React from "react";
import { useAtom } from "jotai";
import { toastAtom } from "@/atoms";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  Button,
  FormField,
  FormSelect,
  FormSelectItem,
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  Stack,
} from "@/components";

const schema = yup
  .object({
    firstName: yup.string().required().trim(),
    lastName: yup.string().required().trim(),
    userId: yup.string().matches("^[0-9]*$").length(12).required().trim(),
    notes: yup.string().trim(),
    email: yup.string().email().trim(),
    phoneNumber: yup.string().trim(),
    streetAddress: yup.string().trim(),
    city: yup.string().trim(),
    state: yup.string().length(2).trim(),
    zipcode: yup.string().length(5).trim(),
  })
  .required();

export default function EditMemberDialogForm({ member, open, setOpen, mutate }) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      state: member.contact.state,
    },
  });
  const [toast, setToast] = useAtom(toastAtom);

  function onSubmit(submitData) {
    try {
      fetch("/api/member/editMember", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: member.id,
          firstName: submitData.firstName,
          lastName: submitData.lastName,
          userId: submitData.userId,
          notes: submitData.notes,
          email: submitData.email,
          phoneNumber: submitData.phoneNumber,
          streetAddress: submitData.streetAddress,
          city: submitData.city,
          state: submitData.state,
          zipcode: submitData.zipcode,
        }),
      }).then(() => mutate());
      setToast({
        title: "Successful Edit",
        description: member.id,
        isOpen: true,
      });
    } catch (err) {
      setToast({
        title: "Edit Failed",
        description: err.message,
        isOpen: true,
      });
    }
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='inset-1/2 -translate-x-1/2 -translate-y-1/2 h-3/4 w-fit'>
        <ScrollArea.Root
          tabIndex='0'
          className='relative h-full overflow-hidden hover:cursor-pointer'
        >
          <ScrollArea.Viewport className='h-full w-full pb-20'>
            <Stack className='space-y-8 p-8 h-full'>
              <Stack direction='row' className='justify-between items-center'>
                <DialogTitle>Edit Member</DialogTitle>
                <DialogClose />
              </Stack>

              <form
                tabIndex={-1}
                className='flex flex-col gap-y-4 '
                onSubmit={handleSubmit(onSubmit)}
              >
                <Stack direction='row' className='gap-x-4'>
                  <FormField
                    id='firstName'
                    label='First Name'
                    type='text'
                    defaultValue={member.firstName}
                    error={errors.firstName}
                    errorMessage='This field is required'
                    register={register}
                    required={true}
                  />
                  <FormField
                    id='lastName'
                    label='Last Name'
                    type='text'
                    defaultValue={member.lastName}
                    error={errors.lastName}
                    errorMessage='This field is required'
                    register={register}
                    required={true}
                  />
                </Stack>
                <FormField
                  id='userId'
                  label='Member Id'
                  type='text'
                  defaultValue={member.userId}
                  error={errors.userId}
                  errorMessage={errors.userId?.message}
                  register={register}
                  required={true}
                />
                <FormField
                  id='notes'
                  as='textarea'
                  label='Notes'
                  type='text'
                  className='h-32'
                  defaultValue={member.notes}
                  register={register}
                />
                <FormField
                  id='email'
                  label='Email'
                  type='text'
                  defaultValue={member.contact.email}
                  error={errors.email}
                  errorMessage={errors.email?.message}
                  register={register}
                  required={true}
                />
                <FormField
                  id='phoneNumber'
                  label='Phone Number'
                  type='text'
                  defaultValue={member.contact.phoneNumber}
                  error={errors.phoneNumber}
                  errorMessage={errors.phoneNumber?.message}
                  register={register}
                  required={true}
                />
                <FormField
                  id='streetAddress'
                  label='Street Address'
                  type='text'
                  defaultValue={member.contact.streetAddress}
                  error={errors.streetAddress}
                  errorMessage={errors.streetAddress?.message}
                  register={register}
                  required={true}
                />
                <FormField
                  id='city'
                  label='City'
                  type='text'
                  defaultValue={member.contact.city}
                  error={errors.city}
                  errorMessage={errors.city?.message}
                  register={register}
                  required={true}
                />
                <FormSelect
                  id='state'
                  label='State'
                  name='state'
                  className=''
                  placeholder='Select state'
                  defaultValue={member.contact.state}
                  onValueChange={(value) => setValue("state", value)}
                  error={errors.state}
                  errorMessage={errors.state?.message}
                >
                  {STATES.map((state, idx) => {
                    return (
                      <FormSelectItem key={idx} value={state.abbreviation}>
                        {state.name}
                      </FormSelectItem>
                    );
                  })}
                </FormSelect>
                <Stack direction='row' className='gap-x-2'>
                  <FormField
                    id='zipcode'
                    label='Zipcode'
                    type='text'
                    defaultValue={member.contact.zipcode}
                    error={errors.zipcode}
                    errorMessage={errors.zipcode?.message}
                    register={register}
                    required={true}
                  />
                </Stack>
                <Stack
                  direction='row'
                  className='-mx-8 w-full px-8 h-20 gap-x-2 bg-white absolute inset-y-[90%] justify-end border-t border-gray7 hover:border-gray8'
                >
                  <Button
                    as='button'
                    label='Cancel'
                    intent='neutral'
                    size=''
                    className='mt-4 h-fit w-fit'
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    as='input'
                    label='Update Member'
                    type='submit'
                    intent='primary'
                    size=''
                    className='mt-4 h-fit w-fit'
                  />
                </Stack>
              </form>
            </Stack>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar
            className='flex px-[1px] w-2 bg-gray-200 rounded-lg'
            orientation='vertical'
          >
            <ScrollArea.Thumb className='flex-grow w-1 rounded-lg bg-gray-400 relative' />
          </ScrollArea.Scrollbar>
          <ScrollArea.Corner className='bg-black' />
        </ScrollArea.Root>
      </DialogContent>
    </Dialog>
  );

  // Validate and normalize data
}

const STATES = [
  {
    name: "Alabama",
    abbreviation: "AL",
  },
  {
    name: "Alaska",
    abbreviation: "AK",
  },
  {
    name: "American Samoa",
    abbreviation: "AS",
  },
  {
    name: "Arizona",
    abbreviation: "AZ",
  },
  {
    name: "Arkansas",
    abbreviation: "AR",
  },
  {
    name: "California",
    abbreviation: "CA",
  },
  {
    name: "Colorado",
    abbreviation: "CO",
  },
  {
    name: "Connecticut",
    abbreviation: "CT",
  },
  {
    name: "Delaware",
    abbreviation: "DE",
  },
  {
    name: "District Of Columbia",
    abbreviation: "DC",
  },
  {
    name: "Federated States Of Micronesia",
    abbreviation: "FM",
  },
  {
    name: "Florida",
    abbreviation: "FL",
  },
  {
    name: "Georgia",
    abbreviation: "GA",
  },
  {
    name: "Guam",
    abbreviation: "GU",
  },
  {
    name: "Hawaii",
    abbreviation: "HI",
  },
  {
    name: "Idaho",
    abbreviation: "ID",
  },
  {
    name: "Illinois",
    abbreviation: "IL",
  },
  {
    name: "Indiana",
    abbreviation: "IN",
  },
  {
    name: "Iowa",
    abbreviation: "IA",
  },
  {
    name: "Kansas",
    abbreviation: "KS",
  },
  {
    name: "Kentucky",
    abbreviation: "KY",
  },
  {
    name: "Louisiana",
    abbreviation: "LA",
  },
  {
    name: "Maine",
    abbreviation: "ME",
  },
  {
    name: "Marshall Islands",
    abbreviation: "MH",
  },
  {
    name: "Maryland",
    abbreviation: "MD",
  },
  {
    name: "Massachusetts",
    abbreviation: "MA",
  },
  {
    name: "Michigan",
    abbreviation: "MI",
  },
  {
    name: "Minnesota",
    abbreviation: "MN",
  },
  {
    name: "Mississippi",
    abbreviation: "MS",
  },
  {
    name: "Missouri",
    abbreviation: "MO",
  },
  {
    name: "Montana",
    abbreviation: "MT",
  },
  {
    name: "Nebraska",
    abbreviation: "NE",
  },
  {
    name: "Nevada",
    abbreviation: "NV",
  },
  {
    name: "New Hampshire",
    abbreviation: "NH",
  },
  {
    name: "New Jersey",
    abbreviation: "NJ",
  },
  {
    name: "New Mexico",
    abbreviation: "NM",
  },
  {
    name: "New York",
    abbreviation: "NY",
  },
  {
    name: "North Carolina",
    abbreviation: "NC",
  },
  {
    name: "North Dakota",
    abbreviation: "ND",
  },
  {
    name: "Northern Mariana Islands",
    abbreviation: "MP",
  },
  {
    name: "Ohio",
    abbreviation: "OH",
  },
  {
    name: "Oklahoma",
    abbreviation: "OK",
  },
  {
    name: "Oregon",
    abbreviation: "OR",
  },
  {
    name: "Palau",
    abbreviation: "PW",
  },
  {
    name: "Pennsylvania",
    abbreviation: "PA",
  },
  {
    name: "Puerto Rico",
    abbreviation: "PR",
  },
  {
    name: "Rhode Island",
    abbreviation: "RI",
  },
  {
    name: "South Carolina",
    abbreviation: "SC",
  },
  {
    name: "South Dakota",
    abbreviation: "SD",
  },
  {
    name: "Tennessee",
    abbreviation: "TN",
  },
  {
    name: "Texas",
    abbreviation: "TX",
  },
  {
    name: "Utah",
    abbreviation: "UT",
  },
  {
    name: "Vermont",
    abbreviation: "VT",
  },
  {
    name: "Virgin Islands",
    abbreviation: "VI",
  },
  {
    name: "Virginia",
    abbreviation: "VA",
  },
  {
    name: "Washington",
    abbreviation: "WA",
  },
  {
    name: "West Virginia",
    abbreviation: "WV",
  },
  {
    name: "Wisconsin",
    abbreviation: "WI",
  },
  {
    name: "Wyoming",
    abbreviation: "WY",
  },
];