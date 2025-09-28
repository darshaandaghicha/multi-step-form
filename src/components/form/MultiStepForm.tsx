'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';

const MultiStepForm = () => {
    const [currentStep, setCurrentStep] = useState(1);

    return (
        <div className="flex min-h-[600px] p-2">
            {/* Sidebar */}
            <Sidebar currentStep={currentStep} />
            {/* Form Area */}
            <div className="flex-1 p-8">{/* Form content will go here */}</div>
        </div>
    );
};

export default MultiStepForm;
