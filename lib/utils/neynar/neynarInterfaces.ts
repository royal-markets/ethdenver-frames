// https://docs.neynar.com/reference/validate-frame
// Assumes `follow_context = true`
export interface ValidateFrameContext {
  valid: boolean;
  action: {
    object: string;
    interactor: {
      object: string;
      fid: number;
      custody_address: string;
      username: string;
      display_name: string;
      pfp_url: string;
      profile: {
        bio: {
          text: string;
        };
      };
      follower_count: number;
      following_count: number;
      verifications: Array<string>;
      active_status: string;
      // This is what is added by follow_context = true
      viewer_context: {
        following: boolean;
        followed_by: boolean;
      };
    };
    tapped_button: {
      index: number;
    };
    cast: {
      object: string;
      hash: string;
      fid: number;
    };
  };
}

// TODO: Share some common types between this and ValidateFrameContext.
// (The only difference is the `cast` object.)
//
// https://docs.neynar.com/reference/validate-frame
// Assumes `cast_reaction_context = true` and `follow_context = true`
export interface ValidateFrameWithCastContext {
  valid: boolean;
  action: {
    object: string;
    interactor: {
      object: string;
      fid: number;
      custody_address: string;
      username: string;
      display_name: string;
      pfp_url: string;
      profile: {
        bio: {
          text: string;
        };
      };
      follower_count: number;
      following_count: number;
      verifications: Array<string>;
      active_status: string;
      viewer_context: {
        following: boolean;
        followed_by: boolean;
      };
    };
    tapped_button: {
      index: number;
    };
    cast: {
      object: string;
      hash: string;
      thread_hash: string;
      parent_hash: any;
      parent_url: any;
      root_parent_url: any;
      parent_author: {
        fid: any;
      };
      author: {
        object: string;
        fid: number;
        custody_address: string;
        username: string;
        display_name: string;
        pfp_url: string;
        profile: {
          bio: {
            text: string;
            mentioned_profiles: Array<any>;
          };
        };
        follower_count: number;
        following_count: number;
        verifications: Array<string>;
        active_status: string;
      };
      text: string;
      timestamp: string;
      embeds: Array<{
        url: string;
      }>;
      frames: Array<{
        version: string;
        title: string;
        image: string;
        buttons: Array<{
          index: number;
          title: string;
          action_type: string;
        }>;
        post_url: string;
        frames_url: string;
      }>;
      reactions: {
        likes: Array<any>;
        recasts: Array<any>;
      };
      replies: {
        count: number;
      };
      mentioned_profiles: Array<any>;
      viewer_context: {
        liked: boolean;
        recasted: boolean;
      };
    };
  };
}

export interface NeynarResponse {
  valid: boolean;
}
