/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";
import { Formik } from "formik";
import toast from "react-hot-toast";
import Select from "react-select";
import app_api from "../../../utils/api";
import resizeImage from "../../../utils/resizeImage";
function Pedigree() {
  // const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imageFile = event.target.files?.[0];
    if (imageFile) {
      try {
        const resizedImage = await resizeImage(imageFile);
        setFile(resizedImage);
      } catch (error) {
        console.error("Image resize failed:", error);
      }
    }
  };
  const [patient, setPatient] = useState([]);
  async function getPatient() {
    const res = await app_api.get("/patient");
    setPatient(res.data.data);
  }
  useEffect(() => {
    getPatient();
  }, []);

  return (
    <div className="px-4 h-[80vh] sm:px-6 lg:px-8">
      <div>
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Upload Pedigree
          </h1>
        </div>
      </div>

      <Formik
        initialValues={{
          patient_id: "",
          file: null as any,
          patient: {},
        }}
        onSubmit={async (values) => {
          const payload = new FormData();
          payload.append("file", file as any);
          try {
            const res = await app_api.post(
              `/patient/pedigree-chart-upload/${values.patient_id}`,
              payload
            );
            if (res.status === 200) {
              toast.success("Pedigree Chart uploaded successfully");
            }
          } catch (error: any) {
            toast.error(error.message);
          }
        }}
      >
        {({ values, setValues, handleSubmit }) => (
          <form
            onSubmit={handleSubmit}
            className="space-y-8 divide-y divide-gray-200"
          >
            <div className="space-y-6 sm:space-y-5">
              <div className="space-y-6 sm:space-y-5 sm:pt-5">
                <div className="space-y-6 sm:space-y-5">
                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="location_name"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Patient
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <Select
                        options={patient.map((p: any) => ({
                          value: p.id,
                          label: `${p?.firstName.trim()} ${p?.lastName.trim()} - ${
                            p?.patient_id
                          }`,
                        }))}
                        value={values.patient}
                        onChange={(e: any) => {
                          setValues((prev: any) => ({
                            ...prev,
                            patient: e,
                            patient_id: Number(e.value),
                          }));
                        }}
                        className="block w-full max-w-lg rounded-md border-[1px] p-2 border-gray-300 shadow-sm focus:border-[1px] focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                        classNamePrefix="select"
                      />
                    </div>
                  </div>

                  <div className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
                    <label
                      htmlFor="location-code"
                      className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                    >
                      Pedigree Chart
                    </label>
                    <div className="mt-1 sm:col-span-2 sm:mt-0">
                      <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        accept="image/*"
                        capture="environment"
                        className="block w-full max-w-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:max-w-xs sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="ml-3 inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Pedigree;
