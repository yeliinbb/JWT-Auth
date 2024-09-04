import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { queryKeys } from '../lib/constants/queryKeys';
import { getUserInfo, updateProfile } from '../api/auth';
import { UserInfo } from '../types/auth.types';
import defaultImg from '../assets/default-profile.jpg';
import { Link } from 'react-router-dom';

const MyPage = () => {
  const [nickname, setNickname] = useState('');
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const imgRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { data: userInfo, isSuccess } = useQuery<UserInfo>({
    queryKey: [queryKeys.users],
    queryFn: getUserInfo
  });

  useEffect(() => {
    if (userInfo) {
      setNickname(userInfo.nickname || '');
      setPreviewImg(userInfo.avatar || null);
    }
  }, [userInfo]);

  const profileUpdateMutation = useMutation<UserInfo, Error, FormData>({
    mutationFn: updateProfile,
    onSuccess: (updatedUserInfo) => {
      queryClient.setQueryData(
        [queryKeys.users, userInfo?.id],
        updatedUserInfo
      );
      alert('프로필 업데이트가 완료되었습니다.');
      setIsEditing(false);
    },
    onError: (error) => {
      console.error('프로필 업데이트 실패:', error);
      alert('프로필 업데이트에 실패했습니다. 다시 시도해주세요.');
    }
  });

  const handleUpdateProfile = async () => {
    if (!nickname.trim()) {
      alert('닉네임을 입력해주세요.');
      return;
    }

    if (nickname.length < 2 || nickname.length > 10) {
      alert('닉네임은 2자 이상 10자 이내로 입력해주세요.');
      return;
    }

    const formData = new FormData();
    formData.append('nickname', nickname);

    const avatarFile = imgRef?.current?.files?.[0];
    if (avatarFile) {
      if (avatarFile.size > 1 * 1024 * 1024) {
        alert('파일 크기는 1MB이하여야 합니다.');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(avatarFile.type)) {
        alert('JPG, PNG, GIF형식의 이미지만 업로드 가능합니다.');
        return;
      }

      formData.append('avatar', avatarFile);
    }

    if (nickname === userInfo?.nickname && !avatarFile) {
      alert('변경사항이 없습니다.');
      return;
    }
    profileUpdateMutation.mutate(formData);
  };

  const onChangeImgFile = () => {
    const file = imgRef?.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      console.log('reader', reader);
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewImg(reader.result as string);
      };
    }
  };

  const handleClickEdit = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setNickname(userInfo?.nickname || '');
    setPreviewImg(userInfo?.avatar || null);
  };

  return (
    <div>
      <Link to="/">
        <button>back</button>
      </Link>
      {isSuccess && (
        <div className="flex items-center">
          <div className="flex flex-col">
            <img
              src={previewImg || userInfo.avatar || defaultImg}
              alt="프로필 이미지"
              className="w-32 h-32 object-cover rounded-full"
            />
            {isEditing && (
              <>
                <label htmlFor="profile-img" className="cursor-pointer">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="profile-img"
                  ref={imgRef}
                  onChange={onChangeImgFile}
                  className="hidden"
                />
              </>
            )}
          </div>
          <div className="flex flex-col">
            <label>nickname</label>
            <input
              type="text"
              id="nickname"
              placeholder="변경할 닉네임을 입력해주세요."
              defaultValue={userInfo ? userInfo?.nickname : nickname}
              onChange={(e) => setNickname(e.target.value)}
              disabled={!isEditing}
              className={
                isEditing
                  ? 'border border-gray-300'
                  : 'border-none bg-transparent'
              }
            />
          </div>
        </div>
      )}
      {isEditing ? (
        <div>
          <button onClick={handleUpdateProfile}>수정</button>
          <button onClick={handleCancelEdit}>취소</button>
        </div>
      ) : (
        <button
          className="bg-blue-400 font-medium text-white"
          onClick={handleClickEdit}
        >
          프로필 수정하기
        </button>
      )}
    </div>
  );
};

export default MyPage;
