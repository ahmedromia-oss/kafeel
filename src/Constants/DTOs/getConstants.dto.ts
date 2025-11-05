import { Expose } from 'class-transformer';

export class getConstantsDto {
    @Expose()
    aboutEn: string;

    @Expose()
    aboutAr: string;

    @Expose()
    aboutBn: string;

    @Expose()
    aboutHi: string;

    @Expose()
    aboutUr: string;

    @Expose()
    privacyPolicyEn: string;

    @Expose()
    privacyPolicyAr: string;

    @Expose()
    privacyPolicyBn: string;

    @Expose()
    privacyPolicyHi: string;

    @Expose()
    privacyPolicyUr: string;
}

