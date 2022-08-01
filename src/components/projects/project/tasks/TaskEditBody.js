import AddFileIcon from '../../../../images/add-file.svg';
import FileIcon from '../../../../images/file.svg';
import PlusIcon from '../../../../images/plus-white.svg';
import MinusIcon from '../../../../images/minus.svg';
import useError from "../../../../hooks/useError";
import { TaskEditBodyContainer, Label, AddStepButton, AddFileLabel, StepsContainer, StepEdit } from "./Tasks.styles";

const TaskEditBody = ({steps, setSteps, setTitle, setDescription, setSelectedFile, title, description, selectedFile}) => {

    const { dispatchError } = useError();

    const handleAddStep = e => {
        e.preventDefault();
        dispatchError({type: 'reset'});
        if(steps.length >= 10) return dispatchError({type: 'projects/max-steps'});
        setSteps(prev => [...prev, {content: '', checked: false}])
    }

    const handleDeleteStep = (e, index) => {
        e.preventDefault();
        const tempSteps = [...steps];
        tempSteps.splice(index, 1);
        setSteps(tempSteps);
    }

    const handleChangeStepContent = (e, index) => {
        e.preventDefault();
        const tempSteps = [...steps];
        tempSteps[index].content = e.target.value;
        setSteps(tempSteps);
    }

    const handleTitleChange = e => {
        e.preventDefault();
        setTitle(e.target.value);
    }

    const handleDescriptionChange = e => {
        e.preventDefault();
        setDescription(e.target.value);
    }

    const handleChangeFile = e => {
        e.preventDefault();
        const file = e.target.files[0];
        setSelectedFile(file);
    }

    return(
        <TaskEditBodyContainer>
            <Label>
                Task Title: 
                <input maxLength='50' onChange={handleTitleChange} value={title} type='text' name='title'/>
            </Label>
            <Label>
                Description:
                <textarea spellCheck='false' maxLength='300' onChange={handleDescriptionChange} defaultValue={description} name='description' /> 
            </Label>
            <AddStepButton onClick={handleAddStep} type='button'>
                <img src={PlusIcon} alt='' />
                Add Step
            </AddStepButton>
            <AddFileLabel file={selectedFile}>
                {selectedFile ? (
                    <>
                        <img src={FileIcon} alt='' />
                        <p>{selectedFile.name}</p>
                    </>
                ) : (
                    <>
                        <img src={AddFileIcon} alt='' />
                        Add File
                    </>
                )}
                <input onChange={handleChangeFile} type='file' name='file' />
            </AddFileLabel>
            <StepsContainer>
                {steps.map(({content}, index) => (
                    <StepEdit key={index}>
                        <div>{index + 1}</div>
                        <input maxLength='60' onChange={(e) => handleChangeStepContent(e, index)} type='text' name='step' value={content} />
                        <button onClick={(e) => handleDeleteStep(e, index)} type='button'>
                            <img src={MinusIcon} alt='delete step' />
                        </button>
                    </StepEdit>
                ))}
            </StepsContainer>
        </TaskEditBodyContainer>
    )
}

export default TaskEditBody;