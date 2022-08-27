import { FC } from 'react'
import FormGroup from '../form/group'
import { attributes } from '../../../constants'
import { FormikErrors } from 'formik'

const CKEditor: any = '@ckeditor/ckeditor5-react'
const ClassicEditor: any = '@ckeditor/ckeditor5-build-classic'

interface Props {
    label?: any,
    name: string,
    values: any,
    errors: FormikErrors<any>,
    setValues: (values: any, shouldValidate?: boolean | undefined) => void
}

const MyCKEditor: FC<Props> = ({label = null, name, values, errors, setValues}) => {
    return(
        <FormGroup label={label ? label : attributes[name] ?? name} error={errors[name]} className={`${localStorage.theme === 'dark' && 'ck-dark'}`}>
            <CKEditor
                config={{language: 'fa', toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote']}}
                editor={ClassicEditor} 
                data={values[name]}
                onBlur={( event: any, editor: any ) => setValues({...values, [name]: editor.getData()})}
            />
        </FormGroup>
    )
}

export default MyCKEditor