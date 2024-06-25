enum States {
    DRAFT = 1,
    UNLISTED = 2,
    PRIVATE = 3,
    PUBLIC = 4,
    ARCHIVED = 5
  }
  
  export const StateDesc = {
    1: 'Draft',
    2: 'Unlisted',
    3: 'Private',
    4: 'Public',
    5: 'Archived'
  }
  
  export default States;