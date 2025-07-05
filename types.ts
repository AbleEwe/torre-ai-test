export interface UserProfile {
    ardaId: number;
    ggId: string;
    name: string;
    comparableName: string;
    username: string;
    professionalHeadline: string;
    imageUrl: string | null;
    completion: number;
    grammar: number;
    weight: number;
    verified: boolean;
    connections: any[];
    totalStrength: number;
    pageRank: number;
    organizationId: string | null;
    organizationNumericId: string | null;
    publicId: string | null;
    status: string | null;
    creators: any[];
    relationDegree: number;
    isSearchable: boolean;
    contact: boolean;
}

export interface PersonResponse {
    person: {
      professionalHeadline: string;
      completion: number;
      showPhone: boolean;
      created: string;
      verified: boolean;
      flags: {
        accessCohort: boolean;
        benefits: boolean;
        canary: boolean;
        enlauSource: boolean;
        fake: boolean;
        featureDiscovery: boolean;
        firstSignalSent: boolean;
        signalsOnboardingCompleted: boolean;
        importingLinkedin: boolean;
        onBoarded: boolean;
        remoter: boolean;
        signalsFeatureDiscovery: boolean;
        importingLinkedinRecommendations: boolean;
        contactsImported: boolean;
        appContactsImported: boolean;
        genomeCompletionAcknowledged: boolean;
        cvImported: boolean;
        communityCreatedPrivate: boolean;
        communityCreatedClaimed: boolean;
        connectBenefitsViewed: boolean;
        recommendationLeadEmailSent: boolean;
        recommendationsAskedGenomeCompletion: boolean;
        behavioralTraitsAcknowledged: boolean;
        testTaken: boolean;
        previewFeatureDiscovery: boolean;
        boosted: boolean;
        addedFromTeamGenomeOrJobPost: boolean;
        reorderedExperiences: boolean;
        invited: boolean;
        invitationRequested: boolean;
        genomeIndexed: boolean;
      };
      weight: number;
      ggId: string;
      completionStage: {
        stage: number;
        progress: number;
      };
      locale: string;
      subjectId: number;
      picture: string;
      hasEmail: boolean;
      isTest: boolean;
      name: string;
      links: {
        id: string;
        name: string;
        address: string;
      }[];
      location: {
        name: string;
        shortName: string;
        country: string;
        countryCode: string;
        latitude: number;
        longitude: number;
        timezone: string;
        placeId: string;
      };
      theme: string;
      id: string;
      pictureThumbnail: string;
      claimant: boolean;
      summaryOfBio: string;
      publicId: string;
    };
    stats: {
      jobs: number;
      education: number;
      projects: number;
      strengths: number;
    };
    strengths: {
      id: string;
      code: number;
      name: string;
      proficiency: string;
      implicitProficiency: boolean;
      weight: number;
      recommendations: number;
      media: any[]; 
      supra: boolean;
      created: string;
      hits: number;
      relatedExperiences: any[]; 
      pin: boolean;
    }[];
  }