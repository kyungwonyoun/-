import { ChangeEvent, DragEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, ImagePlus, Instagram, Mail, Send, X } from 'lucide-react';
import { DESIGNER_PROFILE } from '../data/profile';

type InquiryType =
  | 'Project Design Inquiry'
  | 'Garden Maintenance'
  | 'Collaboration / Press'
  | 'General Question';

interface AttachedPhoto {
  id: string;
  file: File;
  previewUrl: string;
  sizeLabel: string;
}

const MAX_PHOTOS = 5;
const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function ContactPage() {
  const [copied, setCopied] = useState(false);
  const [inquiryType, setInquiryType] = useState<InquiryType>('Project Design Inquiry');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [locationOrScale, setLocationOrScale] = useState('');
  const [message, setMessage] = useState('');
  const [photos, setPhotos] = useState<AttachedPhoto[]>([]);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const photosRef = useRef<AttachedPhoto[]>([]);
  photosRef.current = photos;

  useEffect(() => {
    return () => {
      photosRef.current.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(DESIGNER_PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  const addFiles = (incoming: FileList | null) => {
    if (!incoming || incoming.length === 0) return;
    setPhotoError(null);

    const remainingSlots = MAX_PHOTOS - photos.length;
    if (remainingSlots <= 0) {
      setPhotoError(`Maximum ${MAX_PHOTOS} photos can be attached.`);
      return;
    }

    const candidates = Array.from(incoming);
    const accepted: AttachedPhoto[] = [];
    const errors: string[] = [];

    for (const file of candidates) {
      if (accepted.length >= remainingSlots) {
        errors.push(`Limit of ${MAX_PHOTOS} photos reached.`);
        break;
      }
      if (!file.type.startsWith('image/')) {
        errors.push(`"${file.name}" is not a supported image file.`);
        continue;
      }
      if (file.size > MAX_FILE_SIZE_BYTES) {
        errors.push(`"${file.name}" exceeds the 10 MB limit.`);
        continue;
      }

      accepted.push({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        file,
        previewUrl: URL.createObjectURL(file),
        sizeLabel: formatFileSize(file.size),
      });
    }

    if (errors.length > 0) {
      setPhotoError(errors[0]);
    }
    if (accepted.length > 0) {
      setPhotos((prev) => [...prev, ...accepted]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    addFiles(e.target.files);
    e.target.value = '';
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const removePhoto = (id: string) => {
    setPhotoError(null);
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target) URL.revokeObjectURL(target.previewUrl);
      return prev.filter((p) => p.id !== id);
    });
  };

  const buildMailtoHref = () => {
    const subject = encodeURIComponent(
      `[${inquiryType}] Portfolio Inquiry${name ? ` from ${name}` : ''}`
    );
    const photoListText =
      photos.length > 0
        ? `\n\nAttached Site / Reference Photos (${photos.length}):\n${photos
            .map((p, idx) => `${idx + 1}. ${p.file.name} (${p.sizeLabel})`)
            .join('\n')}`
        : '';

    const body = encodeURIComponent(
      `Inquiry Type: ${inquiryType}\nName: ${name || '-'}\nEmail: ${email || '-'}\nSite / Scale: ${locationOrScale || '-'}\n\nMessage:\n${message || '-'}${photoListText}`
    );
    return `mailto:${DESIGNER_PROFILE.email}?subject=${subject}&body=${body}`;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  const resetForm = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.previewUrl));
    setPhotos([]);
    setPhotoError(null);
    setName('');
    setEmail('');
    setLocationOrScale('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-10 sm:pt-14 pb-10">
      {/* Header */}
      <div className="pb-10 border-b border-ink/10">
        <p className="text-xs font-medium tracking-[0.14em] uppercase text-stone">
          Inquiries & Collaboration
        </p>
        <h1 className="text-3xl sm:text-5xl font-medium tracking-tight text-ink mt-2">
          Contact
        </h1>
        <p className="text-sm sm:text-base text-stone mt-2 max-w-2xl">
          정원 설계·시공·유지관리 프로젝트 문의 및 건축·인테리어 협업 제안을 환영합니다. 이메일·인스타그램 연결 또는 아래 사진 첨부 문의 양식을 이용해 주세요.
        </p>
      </div>

      <div className="pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left: Direct Email, Instagram & Practical Notes */}
        <div className="lg:col-span-5 space-y-10">
          <div className="p-6 sm:p-8 bg-surface/60 border border-ink/10 space-y-6">
            {/* Email Block */}
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
                  Direct Email
                </p>
                <p className="text-lg sm:text-xl font-medium text-ink mt-1.5 break-all">
                  {DESIGNER_PROFILE.email}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-paper border border-ink/20 text-xs font-medium text-ink hover:border-moss hover:text-moss transition-colors cursor-pointer whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-moss" strokeWidth={1.75} />
                      <span>Email Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${DESIGNER_PROFILE.email}`}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-ink text-paper text-xs font-medium hover:bg-moss transition-colors whitespace-nowrap"
                >
                  <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>Open Mail App</span>
                </a>
              </div>
            </div>

            {/* Instagram Block */}
            <div className="pt-6 border-t border-ink/10 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-[0.12em] uppercase text-stone">
                  Instagram
                </p>
                <p className="text-sm sm:text-base font-medium text-ink mt-1 truncate">
                  {DESIGNER_PROFILE.instagram.handle}
                </p>
              </div>

              <a
                href={DESIGNER_PROFILE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-paper border border-ink/20 text-xs font-medium text-ink hover:border-moss hover:text-moss transition-colors whitespace-nowrap shrink-0"
              >
                <Instagram className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>Visit Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          <div className="space-y-4 text-sm text-stone leading-relaxed border-t border-ink/10 pt-8">
            <h2 className="text-sm font-semibold text-ink">
              What to include in a project inquiry
            </h2>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>— Site location & approximate garden area (대지 위치 및 대략적 면적)</li>
              <li>— Space type: residential, commercial, rooftop, or indoor (공간 유형)</li>
              <li>— Target timeline or seasonal schedule (희망 일정)</li>
              <li>— Current site photos or inspiration references (현장 사진 또는 참고 이미지 첨부)</li>
            </ul>
          </div>

          <div className="p-5 border border-ink/10 space-y-2 text-xs text-stone">
            <p className="font-medium text-ink">
              Future Studio Expansion · {DESIGNER_PROFILE.futurePracticeNote.brandName}
            </p>
            <p className="leading-relaxed">
              {DESIGNER_PROFILE.futurePracticeNote.noteKr}
            </p>
          </div>
        </div>

        {/* Right: Flexible Inquiry Form with Photo Upload */}
        <div className="lg:col-span-7">
          {submitted ? (
            <div className="p-8 sm:p-10 bg-surface/60 border border-moss/30 space-y-5">
              <div className="inline-flex items-center gap-2 text-moss text-sm font-semibold">
                <Check className="w-4 h-4" strokeWidth={2} />
                <span>Inquiry Draft Ready</span>
              </div>
              <h2 className="text-2xl font-medium text-ink">
                Thank you, {name}.
              </h2>
              <p className="text-sm text-stone leading-relaxed">
                작성하신 문의 내용이 정리되었습니다. 아래 버튼을 눌러 사용 중인 메일 앱으로 내용을 전달하실 수 있으며,{' '}
                {photos.length > 0
                  ? '선택하신 현장/참고 사진 파일은 메일 앱 실행 후 파일 첨부로 함께 동봉해 주세요.'
                  : '인스타그램 DM 또는 이메일로도 편하게 연락 주실 수 있습니다.'}
              </p>

              <div className="p-4 bg-paper border border-ink/10 text-xs text-ink/80 space-y-2">
                <p><strong>Type:</strong> {inquiryType}</p>
                <p><strong>Reply to:</strong> {email}</p>
                {locationOrScale && <p><strong>Site / Area:</strong> {locationOrScale}</p>}
                <p className="pt-1 text-stone whitespace-pre-line">{message}</p>

                {photos.length > 0 && (
                  <div className="pt-3 border-t border-ink/10 space-y-2">
                    <p className="font-medium text-ink tabular-nums">
                      Selected Photos ({photos.length})
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5">
                      {photos.map((photo) => (
                        <div key={photo.id} className="space-y-1">
                          <div className="aspect-[4/3] bg-surface overflow-hidden border border-ink/10">
                            <img
                              src={photo.previewUrl}
                              alt={photo.file.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <p className="text-[11px] text-stone truncate" title={photo.file.name}>
                            {photo.file.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={buildMailtoHref()}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-moss text-paper text-xs font-medium hover:bg-moss-hover transition-colors whitespace-nowrap"
                >
                  <Mail className="w-4 h-4" strokeWidth={1.5} />
                  <span>Send via Mail App</span>
                </a>
                <a
                  href={DESIGNER_PROFILE.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 border border-ink/20 text-xs font-medium text-ink hover:border-moss hover:text-moss transition-colors whitespace-nowrap"
                >
                  <Instagram className="w-4 h-4" strokeWidth={1.5} />
                  <span>Instagram DM</span>
                </a>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-4 py-2.5 border border-ink/20 text-xs font-medium text-stone hover:text-ink hover:border-ink transition-colors cursor-pointer whitespace-nowrap"
                >
                  Write Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 border border-ink/10 p-6 sm:p-8 bg-paper">
              <div>
                <h2 className="text-xl font-medium text-ink">Send an Inquiry</h2>
                <p className="text-xs text-stone mt-1">
                  프로젝트 견적 상담, 유지관리 문의 또는 일반 질문을 남겨주세요. 현장 사진 첨부도 가능합니다.
                </p>
              </div>

              {/* Inquiry Type Selector */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-ink">
                  Inquiry Purpose · 문의 유형
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {(
                    [
                      'Project Design Inquiry',
                      'Garden Maintenance',
                      'Collaboration / Press',
                      'General Question',
                    ] as InquiryType[]
                  ).map((type) => {
                    const active = inquiryType === type;
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setInquiryType(type)}
                        className={`px-3.5 py-2.5 text-left text-xs font-medium border transition-colors cursor-pointer ${
                          active
                            ? 'border-moss bg-moss/5 text-moss'
                            : 'border-ink/15 text-stone hover:text-ink hover:border-ink/30'
                        }`}
                      >
                        {type}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="contact-name" className="block text-xs font-medium text-ink">
                    Name · 성함 <span className="text-moss">*</span>
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Hong Gil-dong"
                    className="w-full px-3.5 py-2.5 bg-paper border border-ink/20 text-sm text-ink placeholder:text-stone/50 focus:border-moss focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-email" className="block text-xs font-medium text-ink">
                    Email · 이메일 <span className="text-moss">*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 bg-paper border border-ink/20 text-sm text-ink placeholder:text-stone/50 focus:border-moss focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-site" className="block text-xs font-medium text-ink">
                  Location & Approximate Area · 위치 및 면적 (Optional)
                </label>
                <input
                  id="contact-site"
                  type="text"
                  value={locationOrScale}
                  onChange={(e) => setLocationOrScale(e.target.value)}
                  placeholder="e.g., Seongbuk-gu residential courtyard, approx. 120 m²"
                  className="w-full px-3.5 py-2.5 bg-paper border border-ink/20 text-sm text-ink placeholder:text-stone/50 focus:border-moss focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="contact-message" className="block text-xs font-medium text-ink">
                  Message · 문의 내용 <span className="text-moss">*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share brief context about your space, timeline, or collaboration idea."
                  className="w-full px-3.5 py-2.5 bg-paper border border-ink/20 text-sm text-ink placeholder:text-stone/50 focus:border-moss focus:outline-none resize-y"
                />
              </div>

              {/* Photo Attachment Dropzone & Previews */}
              <div className="space-y-2.5">
                <div className="flex items-baseline justify-between gap-2">
                  <label htmlFor="contact-photos" className="block text-xs font-medium text-ink">
                    Site or Reference Photos · 현장 및 참고 사진 첨부 (Optional)
                  </label>
                  <span className="text-xs text-stone font-mono tabular-nums">
                    {photos.length}/{MAX_PHOTOS}
                  </span>
                </div>

                <input
                  ref={fileInputRef}
                  id="contact-photos"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="sr-only"
                />

                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`border border-dashed p-5 transition-colors ${
                    isDragging
                      ? 'border-moss bg-moss/5'
                      : 'border-ink/25 bg-surface/35 hover:border-ink/40'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <ImagePlus className="w-5 h-5 text-stone shrink-0 mt-0.5" strokeWidth={1.5} />
                      <div className="space-y-0.5">
                        <p className="text-xs font-medium text-ink">
                          Drop site photos here or select from your device
                        </p>
                        <p className="text-xs text-stone">
                          보유하신 현장 사진이나 희망 참고 이미지를 첨부하세요 (최대 {MAX_PHOTOS}장, 장당 10MB 이하).
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={photos.length >= MAX_PHOTOS}
                      className="px-4 py-2 bg-paper border border-ink/20 text-xs font-medium text-ink hover:border-moss hover:text-moss disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Select Photos
                    </button>
                  </div>

                  {photoError && (
                    <p className="mt-3 text-xs text-red-700" role="alert">
                      {photoError}
                    </p>
                  )}

                  {photos.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-ink/10 grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {photos.map((photo) => (
                        <div
                          key={photo.id}
                          className="relative bg-paper border border-ink/10 p-2 space-y-1.5"
                        >
                          <div className="relative aspect-[4/3] bg-surface overflow-hidden">
                            <img
                              src={photo.previewUrl}
                              alt={photo.file.name}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => removePhoto(photo.id)}
                              aria-label={`Remove ${photo.file.name}`}
                              className="absolute top-1.5 right-1.5 w-7 h-7 flex items-center justify-center bg-ink/80 text-paper hover:bg-moss transition-colors cursor-pointer"
                            >
                              <X className="w-3.5 h-3.5" strokeWidth={1.75} />
                            </button>
                          </div>
                          <div className="flex items-center justify-between gap-2 text-[11px]">
                            <span className="text-ink truncate" title={photo.file.name}>
                              {photo.file.name}
                            </span>
                            <span className="text-stone font-mono tabular-nums shrink-0">
                              {photo.sizeLabel}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-moss text-paper text-sm font-medium hover:bg-moss-hover transition-colors cursor-pointer whitespace-nowrap"
                >
                  <Send className="w-4 h-4" strokeWidth={1.5} />
                  <span>Prepare Inquiry</span>
                </button>
                <a
                  href={buildMailtoHref()}
                  className="text-xs text-stone hover:text-ink underline underline-offset-4"
                >
                  Or open directly in mail client
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
