import React, { useEffect, useState } from 'react'; 
import { useForm, Controller } from "react-hook-form";
import Select from 'react-select'

import { Button } from 'primereact/button';

const SidebarForm = (props) => { 
    const {showForm, fields, readOnly, onSubmit,  onCloseForm, formValues, formTitle} = props;
    const defaultClass= 'sidebar-form';
    const { register, handleSubmit, reset, control, formState: {isDirty,isSubmitting,  isValid, errors } } = useForm({ mode: "onChange", defaultValues:formValues});
    const [sidebarClassName, setSidebarClassName] = useState(defaultClass);
    
    useEffect(() => {
        reset(formValues);
        toggleSidebar();
    },[showForm, formValues])

    const handleCloseButtonClick = ()=>{
           onCloseForm(!showForm);
           toggleSidebar();
    }
   
     const toggleSidebar = () => {
        const formClassName = showForm? `${defaultClass} active`: defaultClass;
        setSidebarClassName(formClassName);
    }

    const submitForm = (data)=>{
       if(data){
         onSubmit(data);
       }
    }
   const errorTemplate =(field)=>{
       return(
           <>
             {errors[field.key] && <span className='error'><i className='fas fa-exclamation-triangle'></i>{errors[field.key].message}</span>}
           </>

       )
   }
     
     const generateField = (field,index)=>{
         const validation = field.validation? field.validation:{};
         if(field.type==='text'){
             return (
                    <div className="form-field-group sm:basis-4/4 mb-4 px-2" key={index}>
                            <label htmlFor={field.key}>{field.label}{(validation && validation.required )&& <span className='required'>*</span> }</label>
                            <input type="text"  className={errors[field.key] ?'form-control form-error':'form-control'} name={field.key}  id={field.key} {...register(field.key,{...validation})}  disabled={readOnly}/>
                           {errorTemplate(field)}
                           
                        </div>
             )
         }
         else if(field.type==='select'){
             const selectedValue=(value)=>{
                 if(!value){
                     return "";
                }
               return field.values.filter(c => c[field.name]===value[field.name])
             }
            return (
                  
                        <Controller
                        key={index}
                        control={control}
                        defaultValue={formValues[field.name]}
                        name={field.name}
                        rules={{...validation }}
                        render={({ field: { onChange,value,  ref }}) => (
                        <div className="form-field-group sm:basis-2/4 mb-4 px-2">
                            <label htmlFor={field.key}>{field.label}{(validation && validation.required )&& <span className='required'>*</span> }</label>
                                    <Select
                                    placeholder={field.placeholder}
                                    inputRef={ref}
                                    value={selectedValue(value)}
                                    onChange={val => onChange(val)}
                                    options={field.values} getOptionLabel={option => option[field.name] }
                                    getOptionValue={option =>  option[field.value]}
                                    />
                                     {errorTemplate(field)}
                            </div>
                      )}
                      />
            )
        }
        //  else if(field.type=='file'){
        //     return (
        //            <div className="p-field" key={index}>
        //                    <label htmlFor={field.key}>{field.label}</label>
        //                    <FileUpload id={field.key} name={field.key} auto />
        //                </div>
        //     )
        // }
         else if(field.type==='textarea'){
            return (
                   <div className="basis-4/4 w-full mb-4 px-2" key={index}>
                           <label htmlFor={field.key}>{field.label}</label>
                           <textarea  className='form-control'  id={field.key}  {...register(field.key,{...validation })}   disabled={readOnly}  rows={3} cols={20} />
                           {errorTemplate(field)}
                     </div>
            )
        }
     }
   
    return (
        <aside className={sidebarClassName}>
         <div className='sidebar-bg'></div>
         <div className='sidebar-inner-wrapper'>
            <header className="form-header">
                <h2 className='form-title'>{formTitle}</h2>
                <button className="far fa-times-circle close-botton" onClick={() => handleCloseButtonClick()}></button>
            </header>
            <form onSubmit={handleSubmit(submitForm)} noValidate>
            { (showForm && fields.length) && <div className="form-inner h-full content-start flex flex-wrap">
                    { fields.map((field, index)=>{
                        return generateField(field, index);
                    })}
                 {!readOnly  &&  <div className="basis-4/4 w-full mb-4 px-2">
                        <Button type="submit" label="Save" className="btn w-full" disabled={!isDirty || isSubmitting || !isValid}  />
                        </div> }
            </div> }
            </form>
            </div>
        </aside>
    );
}

export default SidebarForm;