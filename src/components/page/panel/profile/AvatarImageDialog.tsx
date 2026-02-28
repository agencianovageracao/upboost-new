'use client';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { editUserProfile } from '@/functions/user.client';
import { useToast } from '@/hooks/use-toast';
import type { UserType } from '@/types/user';
import { DialogClose } from '@radix-ui/react-dialog';
import { ImagePlus, Loader2, Trash } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const AvatarImageDialog = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: UserType;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);

  const { toast } = useToast();
  const router = useRouter();

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png'] },
    onDrop: async (acceptedFiles: File[]) => {
      setIsLoading(true);
      const file = acceptedFiles[0];

      if (file) {
        const formData = new FormData();
        formData.append('image', file);

        try {
          const request = await fetch('https://api.imgur.com/3/image', {
            headers: {
              Accept: 'application/json',
              Authorization: 'Client-ID 81ebd9cffaa9305',
            },
            method: 'POST',
            body: formData,
          });
          const response = await request.json();

          if (response.status === 200) {
            setPhoto(response.data.link);
          }
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      }
    },
  });

  const onSavePhoto = async () => {
    if (!photo || typeof photo !== 'string') return;

    setIsLoading(true);

    try {
      const response = await editUserProfile(
        {
          avatarUrl: `${photo}`.replace('https://i.imgur.com/', ''),
        },
        user.token
      );

      if (response) {
        toast({
          title: 'Imagem de perfil alterada com sucesso',
          duration: 1000,
          variant: 'success',
        });
        router.refresh();
      } else {
        toast({
          title: 'Erro ao alterar a imagem de perfil',
          duration: 1000,
          variant: 'error',
        });
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Erro ao alterar a imagem de perfil',
        duration: 1000,
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onRemovePhoto = async () => {
    if (!photo || typeof photo !== 'string') return;

    setIsLoading(true);

    try {
      const response = await editUserProfile(
        {
          avatarUrl: null,
        },
        user.token
      );

      if (response) {
        toast({
          title: 'Imagem de perfil alterada com sucesso',
          duration: 1000,
          variant: 'success',
        });
        router.refresh();
      } else {
        toast({
          title: 'Erro ao alterar a imagem de perfil',
          duration: 1000,
          variant: 'error',
        });
      }
    } catch (error) {
      console.log(error);

      toast({
        title: 'Erro ao alterar a imagem de perfil',
        duration: 1000,
        variant: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user.avatarUrl) {
      setPhoto(`https://i.imgur.com/${user.avatarUrl}`);
    }
  }, [user]);

  return (
    <Dialog
      onOpenChange={(e) => {
        if (!e) {
          setPhoto(null);
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='avatar-dialog w-full'>
        <DialogHeader>
          <DialogTitle>Alterar imagem de perfil</DialogTitle>
          <DialogDescription>
            Chegou a hora de definir sua imagem de perfil. Tente usar uma imagem
            512x512.
          </DialogDescription>
        </DialogHeader>
        {photo ? (
          <div className='flex w-full flex-col items-center justify-center'>
            <Avatar className='h-[250px] w-[250px]'>
              <Image
                src={photo}
                width={400}
                height={400}
                alt='Imagem de perfil'
              />
            </Avatar>
            <p className='mt-5 text-center text-sm text-neutral-300'>
              Caso deseje remover sua imagem de perfil, clique no botão abaixo.
            </p>
          </div>
        ) : (
          <>
            <div {...getRootProps({})}>
              <div className='flex cursor-pointer items-center justify-center gap-4 rounded-lg border border-dashed border-theme-600 bg-theme-800 p-[30px] max-md:p-4'>
                {isLoading ? (
                  <Loader2
                    size={80}
                    className='loading text-4xl text-theme-400'
                  />
                ) : (
                  <>
                    <div>
                      <h1 className='text-xl font-bold max-md:text-lg'>
                        Upload de imagem
                      </h1>
                      <p className='max-md:text-sm'>
                        Clique aqui ou arraste uma imagem pra cá
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
            <input {...getInputProps({ className: 'hidden' })} />
          </>
        )}
        <DialogFooter className='flex items-center justify-end gap-2'>
          {photo && (
            <DialogClose asChild>
              <Button
                onClick={onRemovePhoto}
                className='text-md'
                variant='panelGhost'
                size='sm'
              >
                <Trash size={18} />
                Remover foto atual
              </Button>
            </DialogClose>
          )}
          <DialogClose asChild>
            <Button onClick={onSavePhoto} className='text-md' size='sm'>
              <ImagePlus size={18} />
              Salvar foto
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
