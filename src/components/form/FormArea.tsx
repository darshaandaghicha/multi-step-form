'use client';

import { FREE_MONTHS, PLANS } from '@/data/config.json';
import formSchema from '@/schema/formSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const FormArea = ({ currentStep, setCurrentStep }: Props) => {
    const formInfo = useForm<FormInfoType>({
        resolver: zodResolver(formSchema),
        mode: 'onBlur',
        defaultValues: {
            plan: { billingCycle: 'monthly', plan: 'arcade' },
        },
    });
    const { trigger, getValues } = formInfo;
    const handleNext = async () => {
        let isValid = false;
        switch (currentStep) {
            case 1:
                isValid = await trigger([
                    'personalInfo.name',
                    'personalInfo.email',
                    'personalInfo.phone',
                ]);
                break;
            case 2:
                isValid = await trigger(['plan.plan', 'plan.billingCycle']);
                break;
            case 3:
                isValid = true;
                break;
            default:
                isValid = true;
        }
        if (isValid) setCurrentStep(currentStep + 1);
        console.log('V', getValues(), currentStep);
    };
    const handleBack = () => {
        setCurrentStep(currentStep - 1);
    };
    const renderCurrentStep = () => {
        switch (currentStep) {
            case 1:
                return <PersonalInfoForm formInfo={formInfo} />;
            case 2:
                return <SelectPlanForm formInfo={formInfo} />;
            case 3:
                return <AddOnsForm />;
            case 4:
                return <SummaryForm />;
            case 5:
                return <ThankYouForm />;
            default:
                return <NoForm />;
        }
    };

    return (
        <div className="flex flex-1 flex-col justify-between p-4">
            <form className="flex flex-1 flex-col justify-between p-4">
                {/* Form Content */}
                <div className="flex-1">{renderCurrentStep()}</div>
            </form>
            {/* Navigation Buttons */}
            {currentStep >= 1 && currentStep <= 4 && (
                <div className="mt-8 flex justify-between">
                    {currentStep > 1 && (
                        <button
                            className="text-grey-500 cursor-pointer hover:text-blue-950"
                            onClick={handleBack}
                        >
                            Go Back
                        </button>
                    )}
                    <button
                        className="hover:bg-opacity-90 ml-auto cursor-pointer rounded-lg bg-blue-950 px-6 py-3 font-medium text-white"
                        onClick={handleNext}
                    >
                        {currentStep === 4 ? 'Confirm' : 'Next Step'}
                    </button>
                </div>
            )}
        </div>
    );
};

const PersonalInfoForm = ({ formInfo }: ChildFormProps) => {
    const {
        register,
        formState: { errors },
    } = formInfo;

    return (
        <div className="max-w-md">
            <div className="mb-4">
                <h1 className="mb-2 text-3xl font-bold text-blue-950">
                    Personal info
                </h1>
                <p className="text-grey-500">
                    Please provide your name, email address, and phone number.
                </p>
            </div>
            <div className="space-y-6">
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-blue-950"
                    >
                        Name
                    </label>
                    <input
                        id="name"
                        type="text"
                        {...register('personalInfo.name')}
                        placeholder="e.g. Stephen King"
                        className={`w-full rounded-lg border px-4 py-3 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 focus:outline-none ${
                            errors.personalInfo?.name
                                ? 'border-red-500'
                                : 'border-blue-200'
                        }`}
                    />
                    {errors.personalInfo?.name && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.personalInfo.name.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-blue-950"
                    >
                        Email Address
                    </label>
                    <input
                        id="email"
                        type="email"
                        {...register('personalInfo.email')}
                        placeholder="e.g. stephenking@lorem.com"
                        className={`w-full rounded-lg border px-4 py-3 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 focus:outline-none ${
                            errors.personalInfo?.email
                                ? 'border-red-500'
                                : 'border-blue-200'
                        }`}
                    />
                    {errors.personalInfo?.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.personalInfo.email.message}
                        </p>
                    )}
                </div>
                <div>
                    <label
                        htmlFor="phone"
                        className="mb-2 block text-sm font-medium text-blue-950"
                    >
                        Phone Number
                    </label>
                    <input
                        id="phone"
                        type="tel"
                        {...register('personalInfo.phone')}
                        placeholder="e.g. +1 234 567 890"
                        className={`w-full rounded-lg border px-4 py-3 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 focus:outline-none ${
                            errors.personalInfo?.phone
                                ? 'border-red-500'
                                : 'border-blue-200'
                        }`}
                    />
                    {errors.personalInfo?.phone && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.personalInfo.phone.message}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

const SelectPlanForm = ({ formInfo }: ChildFormProps) => {
    const { register, watch, setValue } = formInfo;
    const billingCycle = watch('plan.billingCycle') || 'monthly';
    const selectedPlan = watch('plan.plan');
    return (
        <div className="max-w-xl space-y-8">
            <header>
                <h1 className="mb-2 text-3xl font-bold text-blue-950">
                    Select your plan
                </h1>
                <p className="text-grey-500">
                    You have the option of monthly or yearly billing.
                </p>
            </header>

            {/* PLAN CARDS */}
            <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {PLANS.map((plan) => {
                    const isSelected = selectedPlan === plan.id;

                    return (
                        <label
                            key={plan.id}
                            className={`cursor-pointer rounded-lg border-2 p-4 transition-all hover:border-purple-600 ${
                                isSelected
                                    ? 'border-purple-600 bg-purple-50'
                                    : 'border-gray-200'
                            }`}
                        >
                            <input
                                {...register('plan.plan')}
                                type="radio"
                                value={plan.id}
                                className="sr-only"
                            />

                            <div className="flex h-full flex-col">
                                <div className="mb-4">
                                    <Image
                                        src={plan.icon}
                                        alt={plan.label}
                                        width={40}
                                        height={40}
                                    />
                                </div>

                                <div className="flex-grow">
                                    <h3 className="mb-1 font-medium text-blue-950">
                                        {plan.label}
                                    </h3>
                                    <div className="text-grey-500 relative mb-1 h-5">
                                        {/* Monthly Price */}
                                        <span
                                            className={`absolute top-0 left-0 w-full transition-opacity duration-200 ${
                                                billingCycle === 'monthly'
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            }`}
                                            style={{ pointerEvents: 'none' }}
                                        >
                                            ${plan.price}/mo
                                        </span>
                                        {/* Yearly Price */}
                                        <span
                                            className={`absolute top-0 left-0 w-full transition-opacity duration-200 ${
                                                billingCycle === 'yearly'
                                                    ? 'opacity-100'
                                                    : 'opacity-0'
                                            }`}
                                            style={{ pointerEvents: 'none' }}
                                        >
                                            ${plan.price * (12 - FREE_MONTHS)}
                                            /yr
                                        </span>
                                    </div>
                                    {/* <p className="text-grey-500 text-sm">
                                        {getPriceLabel(plan.price)}
                                    </p> */}
                                    <p
                                        className={`mt-1 text-xs text-blue-950 transition-opacity duration-200`}
                                        style={{
                                            opacity:
                                                billingCycle === 'yearly'
                                                    ? 1
                                                    : 0,
                                            height: '1.25rem',
                                            pointerEvents: 'none',
                                            userSelect: 'none',
                                        }}
                                    >
                                        {FREE_MONTHS} months free
                                    </p>
                                </div>
                            </div>
                        </label>
                    );
                })}
            </div>
            {/* BILLING CYCLE TOGGLE */}
            <div className="flex items-center justify-center gap-6 rounded-lg bg-blue-50 py-4">
                <span
                    className={`text-sm font-medium ${
                        billingCycle === 'monthly'
                            ? 'text-blue-950'
                            : 'text-grey-500'
                    }`}
                >
                    Monthly
                </span>

                {/* Custom Toggle Switch */}
                <button
                    type="button"
                    onClick={() =>
                        setValue(
                            'plan.billingCycle',
                            billingCycle === 'monthly' ? 'yearly' : 'monthly'
                        )
                    }
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 focus:outline-none ${
                        billingCycle === 'yearly'
                            ? 'bg-blue-950'
                            : 'bg-gray-300'
                    }`}
                >
                    <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            billingCycle === 'yearly'
                                ? 'translate-x-6'
                                : 'translate-x-1'
                        }`}
                    />
                </button>

                <span
                    className={`text-sm font-medium ${
                        billingCycle === 'yearly'
                            ? 'text-blue-950'
                            : 'text-grey-500'
                    }`}
                >
                    Yearly
                </span>
            </div>
        </div>
    );
};

const AddOnsForm = () => {
    return <></>;
};

const SummaryForm = () => {
    return <></>;
};

const ThankYouForm = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
            {/* Error Icon */}
            <div className="h-16 w-16">
                <Image
                    src="/icons/icon-thank-you.svg"
                    alt="Thank You"
                    width={64}
                    height={64}
                    className="h-full w-full"
                />
            </div>
            {/* Title */}
            <h1 className="text-3xl font-bold text-blue-950">Thank You!</h1>

            {/* Description */}
            <p className="text-grey-500 max-w-md">
                Thanks for confirming your subscription! We hope you have fun
                using our platform. If you ever need support, please feel free
                to email us at support@loremgaming.com.
            </p>
        </div>
    );
};

const NoForm = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
            {/* Error Icon */}
            <div className="h-16 w-16">
                <Image
                    src="/icons/icon-error.svg"
                    alt="Error"
                    width={64}
                    height={64}
                    className="h-full w-full"
                />
            </div>
            {/* Title */}
            <h1 className="text-3xl font-bold text-blue-950">Oops!</h1>

            {/* Description */}
            <p className="text-grey-500 max-w-md">
                We are unable to display form at the moment. If the issue
                persists kindly contact administration.
            </p>
        </div>
    );
};

interface Props {
    currentStep: number;
    setCurrentStep: Dispatch<SetStateAction<number>>;
}

interface ChildFormProps {
    formInfo: UseFormReturn<FormInfoType>;
}

type FormInfoType = z.infer<typeof formSchema>;

export default FormArea;
