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
      <div className="flex items-center justify-between w-full h-25 p-2 shadow-md">
        <Link to="/">
          <button className="font-bold text-xl bg-slate-300 px-4 py-2 rounded-xl hover:bg-slate-200">
            back
          </button>
        </Link>
      </div>
      <section className="flex flex-col items-center justify-center p-4 gap-5 h-ful w-full">
        {isSuccess && (
          <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center mb-3">
              <img
                src={previewImg || userInfo.avatar || defaultImg}
                alt="프로필 이미지"
                className="w-40 h-40 object-cover rounded-full shadow-lg mb-3"
              />
              {isEditing && (
                <>
                  <label
                    htmlFor="profile-img"
                    className="cursor-pointer bg-slate-100 shadow-lg text-base font-medium px-2 py-1 rounded-lg hover:bg-slate-50 text-center"
                  >
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
              <label className="text-xl font-medium text-center">닉네임</label>
              <input
                type="text"
                id="nickname"
                placeholder="변경할 닉네임을 입력해주세요."
                defaultValue={userInfo ? userInfo?.nickname : nickname}
                onChange={(e) => setNickname(e.target.value)}
                disabled={!isEditing}
                className={`${
                  isEditing
                    ? 'border border-gray-300 px-2'
                    : 'border-none bg-transparent'
                } py-1 rounded-lg text-center text-lg font-medium w-[7rem]`}
              />
            </div>
          </div>
        )}
        {isEditing ? (
          <div className="flex gap-2">
            <button
              onClick={handleUpdateProfile}
              className="px-3 py-1 bg-blue-500 rounded-lg text-white font-medium hover:bg-blue-400"
            >
              수정
            </button>
            <button
              onClick={handleCancelEdit}
              className="px-3 py-1 bg-gray-400 rounded-lg text-white font-medium hover:bg-gray-300"
            >
              취소
            </button>
          </div>
        ) : (
          <button
            className="bg-blue-500 text-lg font-medium text-white px-3 py-1 rounded-lg hover:bg-blue-400"
            onClick={handleClickEdit}
          >
            프로필 수정하기
          </button>
        )}
      </section>
    </div>
  );
};

export default MyPage;
