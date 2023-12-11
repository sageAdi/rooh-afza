"use client";

import { useEffect } from "react";
import InputFieldDefault from "@/app/_components/InputField/InputField";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button, Stack } from "@mui/material";
import web3 from "@/app/_library/web3";

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

const initialValues = {
  wei: '1000000000000000000',
  kwei: '1000000000000000',
  mwei: '1000000000000',
  gwei: '1000000000',
  szabo: '1000000',
  finney: '1000',
  ether:'1',
  kether:'0.001',
  mether:'0.000001',
  gether: '0.000000001',
  tether: '0.000000000001',
};

const Conversion = () => {
  const { register, handleSubmit, reset, control, setValue } = useForm();
  
  useEffect(() => {
    Object.entries(initialValues).forEach(([name, value]) => {
      setValue(name, value);
    });
  }, [setValue]);

  const submit = (data: FieldValues) => {
    const _data = web3.conversions(data['ether'], 'ether');
    Object.entries(_data).forEach(element => {
      setValue(element[1]?.key, element[1]?.value)
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <Stack spacing={1} width={"50%"}>
          <InputFieldDefault name={"wei"} control={control} label={"Wei"} />
          <InputFieldDefault name={"kwei"} control={control} label={"KWei"} />
          <InputFieldDefault name={"mwei"} control={control} label={"MWei"} />
          <InputFieldDefault name={"gwei"} control={control} label={"GWei"} />
          <InputFieldDefault name={"szabo"} control={control} label={"Szabo"} />
          <InputFieldDefault
            name={"finney"}
            control={control}
            label={"Finney"}
          />
          <InputFieldDefault name={"ether"} control={control} label={"Ether"} />
          <InputFieldDefault
            name={"kether"}
            control={control}
            label={"KEther"}
          />
          <InputFieldDefault
            name={"mether"}
            control={control}
            label={"MEther"}
          />
          <InputFieldDefault
            name={"gether"}
            control={control}
            label={"GEther"}
          />
          <InputFieldDefault
            name={"tether"}
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
