'use client';

const Sidebar = ({ currentStep }: SidebarProps) => {
    const steps = [
        { number: 1, title: 'YOUR INFO', subtitle: 'STEP 1' },
        { number: 2, title: 'SELECT PLAN', subtitle: 'STEP 2' },
        { number: 3, title: 'ADD-ONS', subtitle: 'STEP 3' },
        { number: 4, title: 'SUMMARY', subtitle: 'STEP 4' },
    ];

    return (
        <div
            className="w-70 rounded-xl bg-purple-600 bg-cover bg-no-repeat"
            style={{ backgroundImage: `url('/images/bg-sidebar-desktop.svg')` }}
        >
            <div className="flex h-1/2 flex-col justify-between p-8 text-white">
                {steps.map((step) => (
                    <div
                        key={step.number}
                        className="flex items-center space-x-4"
                    >
                        <div
                            className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
                                currentStep === step.number
                                    ? 'bg-blue-300 text-blue-950'
                                    : 'border-2 border-blue-200 text-blue-200'
                            }`}
                        >
                            {step.number}
                        </div>
                        <div>
                            <div className="text-sm text-blue-200">
                                {step.subtitle}
                            </div>
                            <div className="font-medium">{step.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

interface SidebarProps {
    currentStep: number;
}

export default Sidebar;
