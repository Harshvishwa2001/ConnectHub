import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfilePhoto from "./ProfilePhoto";
import { Textarea } from "../ui/textarea";
import { Images } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { readFileAsDataUrl } from "@/lib/utils";
import { createPostAction } from "@/lib/serverAction";

export function PostDialog({
  open,
  setOpen,
  src,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  src: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [inputText, setInputText] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
  };

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const dataUrl = await readFileAsDataUrl(file);
      setSelectedFile(dataUrl);
    }
  };

  const postActionHandler = async (formdata: FormData) => {
    const inputText = formdata.get("inputText") as string;
    try {
      await createPostAction(inputText, selectedFile);
    } catch (error) {
      console.error("Error uploading post:", error);
    }
  };

  return (
    <Dialog open={open}>
      <DialogContent
        onInteractOutside={() => setOpen(false)}
        className="sm:max-w-[425px]"
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-4">
            <ProfilePhoto src={src} />
            <div>
              <h2>Harsh Vishwakarma</h2>
              <p className="text-xs">Post to anyone</p>
            </div>
          </DialogTitle>
        </DialogHeader>
        <form action={postActionHandler}>
          <div className="flex flex-col gap-2">
            <Textarea
              placeholder="Type your message here."
              id="name"
              name="inputText"
              className="border text-lg focus-visible:ring-0"
              onChange={handleInputChange}
              value={inputText}
            />
            <div>
              Preview Image
              {selectedFile && (
                <Image
                  src={selectedFile}
                  alt="preview"
                  width={400}
                  height={400}
                />
              )}
            </div>
          </div>
          <DialogFooter>
            <div className="flex items-center gap-4">
              <input
                ref={inputRef}
                onChange={fileChangeHandler}
                type="file"
                name="image"
                className="hidden"
                accept="image/*"
              />
              <Button type="submit" className="mt-2">
                Post
              </Button>
            </div>
          </DialogFooter>
        </form>
        <Button
          onClick={() => inputRef?.current?.click()}
          variant="ghost"
          className="w-full mt-2 gap-2"
        >
          <Images className="text-blue-500" />
          <p>Media</p>
        </Button>
      </DialogContent>
    </Dialog>
  );
}
