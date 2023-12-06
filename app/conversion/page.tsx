"use client";

import InputFieldDefault from "@/app/_components/InputField/InputField";
import { useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";

type Form = {
  Wei: string;
  KWei: string;
  MWei: string;
  GWei: string;
  Szabo: string;
  Finney: string;
  Ether: string;
  KEther: string;
  MEther: string;
  GEther: string;
  TEther: string;
};

const Conversion = () => {
  const { register, handleSubmit, reset, control, setValue } = useForm();

  const submit = (value: any) => {
    console.log(value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Stack spacing={1} width={"50%"}>
          <InputFieldDefault name={"Wei"} control={control} label={"Wei"} />
          <InputFieldDefault name={"KWei"} control={control} label={"KWei"} />
          <InputFieldDefault name={"MWei"} control={control} label={"MWei"} />
          <InputFieldDefault name={"GWei"} control={control} label={"GWei"} />
          <InputFieldDefault name={"Szabo"} control={control} label={"Szabo"} />
          <InputFieldDefault
            name={"Finney"}
            control={control}
            label={"Finney"}
          />
          <InputFieldDefault name={"Ether"} control={control} label={"Ether"} />
          <InputFieldDefault
            name={"KEther"}
            control={control}
            label={"KEther"}
          />
          <InputFieldDefault
            name={"MEther"}
            control={control}
            label={"MEther"}
          />
          <InputFieldDefault
            name={"GEther"}
            control={control}
            label={"GEther"}
          />
          <InputFieldDefault
            name={"TEther"}
            control={control}
            label={"TEther"}
          />
          <Button variant={"contained"} type={"submit"}>
            Submit
          </Button>
        </Stack>
      </form>
    </div>
  );
};
export default Conversion;