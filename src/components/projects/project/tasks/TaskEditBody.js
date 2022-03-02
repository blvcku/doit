import AddFileIcon from '../../../../images/project/tasks/addfile.svg';
import FileIcon from '../../../../images/project/tasks/file.svg';
import PlusIcon from '../../../../images/project/tasks/plus.svg';
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
        const givenFile = e.target.files[0];
        setSelectedFile(givenFile);
    }

    return(
        <TaskEditBodyContainer>
            <Label>
                Task Title: 
                <input maxLength='20' onChange={handleTitleChange} value={title} type='text' name='title'/>
            </Label>
            <Label>
                Description:
                <textarea maxLength='300' onChange={handleDescriptionChange} defaultValue={description} name='description' /> 
            </Label>
            <AddStepButton onClick={handleAddStep} type='button'>
                <img src={PlusIcon} alt='Add' />
                Add Step
            </AddStepButton>
            <AddFileLabel file={selectedFile}>
                {selectedFile ? (
                    <>
                        <img src={FileIcon} alt='file' />
                        <p>{selectedFile.name}</p>
                    </>
                ) : (
                    <>
                        <img src={AddFileIcon} alt='Add file' />
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
                            <img src={MinusIcon} alt='delete' />
                        </button>
                    </StepEdit>
                ))}
            </StepsContainer>
        </TaskEditBodyContainer>
    )
}

export default TaskEditBody;