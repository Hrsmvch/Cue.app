import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./modal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { notesCategoriesApi } from "../../../noteCats/services/NoteCategoriesSlice";
import customStyles from "components/FormElements/customSelectStyles";
import { modalClose } from "services/modalSlice";
import { ReactComponent as PinIcon } from "../../assets/pin.svg";
import { ReactComponent as ImageIcon } from "../../assets/image.svg";
import { ReactComponent as CheckboxIcon } from "../../assets/checkbox.svg";
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg";
import CheckboxList from "../CheckboxList";
import { useRef, useState } from "react";
import { convertBase64 } from "utils/convertBase64";
import { useUpdateNote } from "../../hooks/useUpdateNote";
import { checkModalData } from "services/modalSlice";
import { useOpenNote } from "../../hooks/useOpenNote";

const EditNote = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const modalData = useSelector(checkModalData); 
  const { NoteInfo } = useOpenNote(modalData); 
  
  const { update } = useUpdateNote(); 

  const [withCheckbox, setWithCheckbox] = useState(NoteInfo?.data?.content?.checkboxes?.length);
  const [images, setImages] = useState(NoteInfo?.data?.content?.images);

  const { data: categoriesData } =
    notesCategoriesApi.useGetAllCategoriesQuery();
  const categories = categoriesData?.data?.map((item) => {
    return { value: item.name, label: item.name, id: item._id };
  }); 

  const handleImageClick = () => fileInputRef.current.click();

  const removeImage = (imageURL, setFieldValue) => {
    const index = images.indexOf(imageURL);

    if (index !== -1) {
      const updatedImages = [...images];
      updatedImages.splice(index, 1);
      setImages(updatedImages);
      setFieldValue("content.images", updatedImages);
    }
  }; 
 
  return (
    <div
      className={`${styles.container} ${styles.container__notes}`}
      onClick={(event) => event.stopPropagation()}
    >
      <div className={styles.title}>Edit a note</div>
      <Formik
        initialValues={{
          title: NoteInfo?.data?.title,
          content: {
            text: NoteInfo?.data?.content?.text,
            images: NoteInfo?.data?.content?.images,
            checkboxes: NoteInfo?.data?.content?.checkboxes,
          },
          pinned: NoteInfo?.data?.pinned,
          category: NoteInfo?.data?.category?.id,
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Required"),
          content: Yup.object().shape({
            text: Yup.string(),
            images: Yup.array().of(Yup.string()),
            checkboxes: Yup.array().of(Yup.object()),
          }),
          category: Yup.string().required("Required"),
          pinned: Yup.boolean(),
        })}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={async (values) => { 
          await update(modalData, values)}
        }
      >
        {({ setFieldValue, values, errors }) => (
          <Form className={styles.form}>  
            {images?.length > 0 && (
              <div className={styles.images}>
                {images?.map((image, index) => (
                  <div key={index} className={styles.image_wrapper}>
                    <img src={image} alt="" />
                    <TrashIcon
                      onClick={() => removeImage(image, setFieldValue)}
                    />
                  </div>
                ))}
              </div>
            )}

            <div className={styles.title}>
              <PinIcon
                onClick={() => setFieldValue("pinned", !values.pinned)}
                className={values.pinned ? styles.active : ""}
              />
              <Field 
                type="text"
                name="title"
                placeholder="Simple name" 
                className={
                  errors?.title
                    ? `${styles.simple__input}  ${styles.error}`
                    : `${styles.simple__input}`
                }
              />
            </div>

            <div className={styles.add_content}>
              <Field
                hidden
                type="file"
                name="image"
                accept="image/*"
                innerRef={(input) => {
                  fileInputRef.current = input;
                }}
                onChange={async (event) => {
                  const file = await convertBase64(
                    event.currentTarget.files[0]
                  );
                  setImages([...images, file]);
                  setFieldValue("content.images", [...images, file]);
                }}
              />

              <ImageIcon onClick={() => handleImageClick()} />
              <CheckboxIcon
                onClick={() => setWithCheckbox(!withCheckbox)}
                className={withCheckbox ? styles.active : ""}
              />

              <Select
                name="category"
                styles={customStyles}
                options={categories}
                className={styles.category}
                defaultValue={categories?.find((option) => option?.id == NoteInfo?.data?.category?.id)}
                onChange={(selected) => setFieldValue("category", selected.id)}
                components={{ IndicatorSeparator: () => null }}
              />
            </div>

            <Field
              name="content.text"
              as="textarea" 
              className={styles.select__textarea}
            />

            {withCheckbox && <CheckboxList handleList={setFieldValue} 
            defaultList={values?.content?.checkboxes} />}

            <div className={styles.actions}>
              <button
                className={styles.save}
                type="submit"
              >
                Save
              </button>
              <button
                className={styles.close}
                onClick={() => dispatch(modalClose())}
              ></button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default EditNote;
