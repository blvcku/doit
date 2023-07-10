import AddFileIcon from '../../../../../assets/icons/add-file.svg';
import FileIcon from '../../../../../assets/icons/file.svg';
import PlusIcon from '../../../../../assets/icons/plus-white.svg';
import MinusIcon from '../../../../../assets/icons/minus.svg';
import useError from '../../../../../contexts/error-context/useError';
import {
    ProjectTaskEditorBodyContainer,
    ProjectTaskEditorBodyLabel,
    ProjectTaskEditorBodyInput,
    ProjectTaskEditorBodyTextarea,
    ProjectTaskEditorBodyAddStepButton,
    ProjectTaskEditorBodyAddStepButtonIcon,
    ProjectTaskEditorBodyAddFileLabel,
    ProjectTaskEditorBodyAddFileLabelIcon,
    ProjectTaskEditorBodyAddFileLabelText,
    ProjectTaskEditorBodyAddFileLabelInput,
    ProjectTaskEditorBodyStepsContainer,
    ProjectTaskEditorBodyStepContainer,
    ProjectTaskEditorBodyStepIndicator,
    ProjectTaskEditorBodyStepInput,
    ProjectTaskEditorBodyStepButton,
    ProjectTaskEditorBodyStepButtonIcon,
} from './ProjectTaskEditorBody.styles';

const ProjectTaskEditorBody = ({
    steps,
    setSteps,
    setTitle,
    setDescription,
    setSelectedFile,
    title,
    description,
    selectedFile,
}) => {
    const { dispatchError } = useError();

    const handleAddStep = (e) => {
        e.preventDefault();
        dispatchError({ type: 'reset' });
        if (steps.length >= 10)
            return dispatchError({ type: 'projects/max-steps' });
        setSteps((prev) => [...prev, { content: '', checked: false }]);
    };

    const handleDeleteStep = (e, index) => {
        e.preventDefault();
        const tempSteps = [...steps];
        tempSteps.splice(index, 1);
        setSteps(tempSteps);
    };

    const handleChangeStepContent = (e, index) => {
        e.preventDefault();
        const tempSteps = [...steps];
        tempSteps[index].content = e.target.value;
        setSteps(tempSteps);
    };

    const handleTitleChange = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        e.preventDefault();
        setDescription(e.target.value);
    };

    const handleChangeFile = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        setSelectedFile(file);
    };

    return (
        <ProjectTaskEditorBodyContainer>
            <ProjectTaskEditorBodyLabel>
                Task Title:
                <ProjectTaskEditorBodyInput
                    maxLength="50"
                    onChange={handleTitleChange}
                    value={title}
                    type="text"
                    name="title"
                />
            </ProjectTaskEditorBodyLabel>
            <ProjectTaskEditorBodyLabel>
                Description:
                <ProjectTaskEditorBodyTextarea
                    spellCheck="false"
                    maxLength="300"
                    onChange={handleDescriptionChange}
                    defaultValue={description}
                    name="description"
                />
            </ProjectTaskEditorBodyLabel>
            <ProjectTaskEditorBodyAddStepButton
                onClick={handleAddStep}
                type="button"
            >
                <ProjectTaskEditorBodyAddStepButtonIcon src={PlusIcon} alt="" />
                Add Step
            </ProjectTaskEditorBodyAddStepButton>
            <ProjectTaskEditorBodyAddFileLabel file={selectedFile}>
                {selectedFile ? (
                    <>
                        <ProjectTaskEditorBodyAddFileLabelIcon
                            src={FileIcon}
                            alt=""
                        />
                        <ProjectTaskEditorBodyAddFileLabelText>
                            {selectedFile.name}
                        </ProjectTaskEditorBodyAddFileLabelText>
                    </>
                ) : (
                    <>
                        <ProjectTaskEditorBodyAddFileLabelIcon
                            src={AddFileIcon}
                            alt=""
                        />
                        Add File
                    </>
                )}
                <ProjectTaskEditorBodyAddFileLabelInput
                    onChange={handleChangeFile}
                    type="file"
                    name="file"
                />
            </ProjectTaskEditorBodyAddFileLabel>
            <ProjectTaskEditorBodyStepsContainer>
                {steps.map(({ content }, index) => (
                    <ProjectTaskEditorBodyStepContainer key={index}>
                        <ProjectTaskEditorBodyStepIndicator>
                            {index + 1}
                        </ProjectTaskEditorBodyStepIndicator>
                        <ProjectTaskEditorBodyStepInput
                            maxLength="60"
                            onChange={(e) => handleChangeStepContent(e, index)}
                            type="text"
                            name="step"
                            value={content}
                        />
                        <ProjectTaskEditorBodyStepButton
                            onClick={(e) => handleDeleteStep(e, index)}
                            type="button"
                        >
                            <ProjectTaskEditorBodyStepButtonIcon
                                src={MinusIcon}
                                alt="delete step"
                            />
                        </ProjectTaskEditorBodyStepButton>
                    </ProjectTaskEditorBodyStepContainer>
                ))}
            </ProjectTaskEditorBodyStepsContainer>
        </ProjectTaskEditorBodyContainer>
    );
};

export default ProjectTaskEditorBody;
