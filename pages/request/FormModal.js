import React from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material/styles";
import { useForm, Controller } from "react-hook-form";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import axios from "axios";
import Router from "next/router";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import BtnCancel from "../../components/BtnCancel";

const tag = [
  { id: 1, label: "เวลาไม่สะดวก" },
  { id: 2, label: "สถานที่ไม่สะดวก" },
  { id: 3, label: "วันไม่สะดวก" },
];

function FormModal({ request, open, handleClose }) {
  const { data: session, status } = useSession();
  const theme = useTheme();
  console.log(request);

  const {
    register,
    watch,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
    defaultValues: {
      rejectReason: "",
      status: "",
      tag: "",
      owner_id: session.user.id,
      appointment_id: "",
    },
  });

  console.log(watch(["rejectReason", "tag"]));

  const onSubmit = async (data) => {
    console.log(data);
    data.status = "Rejected"
    const json = JSON.stringify(data);
    let axiosConfig = {
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
      },
    };
    const response = await axios
      .put(
        `https://olive-service-api.vercel.app/appointment/reject/${request._id}`,
        json,
        axiosConfig
      )
      .then(async (res) => {
        console.log("RESPONSE RECEIVED: ", res.data);
        Router.reload();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  return (
    <>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle
          sx={{
            color: theme.palette.secondary.main,
            fontSize: 24,
            mx: 2,
            mt: 2,
          }}
        >
          เหตุผล
        </DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mx-auto max-w-screen-xl px-4 sm:px-6">
                <div className="pb-6">
                  <FormControl>
                    <Controller
                      render={({ field: { onChange, value } }) => (
                        <>
                          <textarea
                            className="lg:w-[450px] rounded-lg border-gray-300  border-2 p-3 text-md lg:text-lg"
                            placeholder="อธิบายเพิ่มเติม....."
                            rows="4"
                            id="rejectReason"
                            {...register("rejectReason", { required: false })}
                          />
                        </>
                      )}
                      name="rejectReason"
                      control={control}
                    />
                  </FormControl>
                </div>
                <div className="pb-6">
                  <FormControl>
                    <Controller
                      render={({ field: { field, onChange, value } }) => (
                        <>
                          <Select
                          sx={{borderRadius: '10px', 
                          '@media (min-width: 780px)': {
                            width: '450px'
                          }, px:4 }}
                            {...field}
                            {...register("tag", { required: false })}
                          >
                            {tag.map((input, key) => (
                              <MenuItem
                                key={input.id}
                                value={input.label}
                                onChange={onChange}
                              >
                                {input.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </>
                      )}
                      name="tag"
                      control={control}
                    />
                  </FormControl>
                </div>
              </div>
            </form>
          </Box>
        </DialogContent>
        <DialogActions sx={{ mx: 4, mb: 4 }}>
          <button
            className="shadow-lg 
                  w-20 h-9  outline-none border-2 border-black/25 hover:bg-black/10
                  rounded-2xl sm:text-sm lg:h-10 lg:text-base xxxl:h-11 xxxl:text-lg"
            onClick={handleClose}
            sx={{ color: theme.palette.secondary.main, fontSize: "18px" }}
          >
            ยกเลิก
          </button>
          <BtnCancel text="ปฏิเสธ" onClick={handleSubmit(onSubmit)} />
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormModal;