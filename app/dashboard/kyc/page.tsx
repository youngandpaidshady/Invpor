"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Upload,
  Camera,
  FileText,
  Home,
  ChevronRight,
  Trash2,
  Loader2,
  RefreshCw,
  Info,
} from "lucide-react";

type KYCStatus = "not_started" | "pending" | "in_review" | "approved" | "rejected";
type DocumentType = "id_front" | "id_back" | "selfie" | "address_proof";

interface DocumentUpload {
  type: DocumentType;
  file: File | null;
  preview: string | null;
  status: "pending" | "uploaded" | "error";
}

interface KYCState {
  status: KYCStatus;
  submittedAt?: string;
  reviewedAt?: string;
  rejectionReason?: string;
  documents: {
    id_front: boolean;
    id_back: boolean;
    selfie: boolean;
    address_proof: boolean;
  };
}

// Simulate initial KYC state (in production, fetch from API)
const initialKYCState: KYCState = {
  status: "not_started",
  documents: {
    id_front: false,
    id_back: false,
    selfie: false,
    address_proof: false,
  },
};

const statusConfig: Record<
  KYCStatus,
  { label: string; color: string; bgColor: string; icon: typeof Shield }
> = {
  not_started: {
    label: "Not Started",
    color: "text-foreground/60",
    bgColor: "bg-foreground/10",
    icon: Shield,
  },
  pending: {
    label: "Pending Upload",
    color: "text-amber-400",
    bgColor: "bg-amber-400/20",
    icon: Clock,
  },
  in_review: {
    label: "In Review",
    color: "text-blue-400",
    bgColor: "bg-blue-400/20",
    icon: RefreshCw,
  },
  approved: {
    label: "Verified",
    color: "text-green-400",
    bgColor: "bg-green-400/20",
    icon: CheckCircle,
  },
  rejected: {
    label: "Rejected",
    color: "text-red-400",
    bgColor: "bg-red-400/20",
    icon: XCircle,
  },
};

const documentTypes: {
  type: DocumentType;
  label: string;
  description: string;
  icon: typeof FileText;
  acceptedFormats: string;
}[] = [
    {
      type: "id_front",
      label: "ID Front",
      description: "Front side of your government-issued ID (passport, driver's license, or national ID)",
      icon: FileText,
      acceptedFormats: "image/jpeg,image/png,image/webp",
    },
    {
      type: "id_back",
      label: "ID Back",
      description: "Back side of your ID (skip if using passport)",
      icon: FileText,
      acceptedFormats: "image/jpeg,image/png,image/webp",
    },
    {
      type: "selfie",
      label: "Selfie with ID",
      description: "Take a clear selfie while holding your ID next to your face",
      icon: Camera,
      acceptedFormats: "image/jpeg,image/png,image/webp",
    },
    {
      type: "address_proof",
      label: "Proof of Address",
      description: "Utility bill, bank statement, or official letter (issued within last 3 months)",
      icon: Home,
      acceptedFormats: "image/jpeg,image/png,image/webp,application/pdf",
    },
  ];

export default function KYCPage() {
  const [kycState, setKYCState] = useState<KYCState>(initialKYCState);
  const [uploads, setUploads] = useState<Record<DocumentType, DocumentUpload>>({
    id_front: { type: "id_front", file: null, preview: null, status: "pending" },
    id_back: { type: "id_back", file: null, preview: null, status: "pending" },
    selfie: { type: "selfie", file: null, preview: null, status: "pending" },
    address_proof: { type: "address_proof", file: null, preview: null, status: "pending" },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const fileInputRefs = useRef<Record<DocumentType, HTMLInputElement | null>>({
    id_front: null,
    id_back: null,
    selfie: null,
    address_proof: null,
  });

  const handleFileSelect = (type: DocumentType, file: File) => {
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setUploads((prev) => ({
        ...prev,
        [type]: {
          ...prev[type],
          file,
          preview: reader.result as string,
          status: "uploaded",
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (type: DocumentType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      handleFileSelect(type, file);
    }
  };

  const handleRemoveFile = (type: DocumentType) => {
    setUploads((prev) => ({
      ...prev,
      [type]: { type, file: null, preview: null, status: "pending" },
    }));
    if (fileInputRefs.current[type]) {
      fileInputRefs.current[type]!.value = "";
    }
  };

  const handleDrop = (type: DocumentType, e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB");
        return;
      }
      handleFileSelect(type, file);
    }
  };

  const canSubmit = () => {
    return (
      uploads.id_front.status === "uploaded" &&
      uploads.selfie.status === "uploaded" &&
      uploads.address_proof.status === "uploaded"
    );
  };

  const handleSubmit = async () => {
    if (!canSubmit()) return;

    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setKYCState({
      status: "in_review",
      submittedAt: new Date().toISOString(),
      documents: {
        id_front: uploads.id_front.status === "uploaded",
        id_back: uploads.id_back.status === "uploaded",
        selfie: uploads.selfie.status === "uploaded",
        address_proof: uploads.address_proof.status === "uploaded",
      },
    });
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  const uploadedCount = Object.values(uploads).filter(
    (u) => u.status === "uploaded"
  ).length;
  const requiredCount = 3; // ID front, selfie, address proof are required

  const status = statusConfig[kycState.status];
  const StatusIcon = status.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold">KYC Verification</h1>
          <p className="text-foreground/60">
            Complete identity verification to unlock payouts
          </p>
        </div>
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${status.bgColor}`}
        >
          <StatusIcon className={`w-5 h-5 ${status.color}`} />
          <span className={`font-semibold ${status.color}`}>{status.label}</span>
        </div>
      </div>

      {/* Status Cards */}
      {kycState.status === "approved" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-400/10 border border-green-400/30 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-green-400/20 flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-400 mb-1">
                Verification Complete
              </h3>
              <p className="text-foreground/70">
                Your identity has been verified. You can now request payouts from
                your funded accounts.
              </p>
              {kycState.reviewedAt && (
                <p className="text-sm text-foreground/50 mt-2">
                  Approved on {new Date(kycState.reviewedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ) : kycState.status === "rejected" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-400/10 border border-red-400/30 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-red-400/20 flex items-center justify-center flex-shrink-0">
              <XCircle className="w-6 h-6 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-1">
                Verification Rejected
              </h3>
              <p className="text-foreground/70">
                {kycState.rejectionReason ||
                  "Your documents could not be verified. Please resubmit with clearer images."}
              </p>
              <button
                onClick={() =>
                  setKYCState((prev) => ({
                    ...prev,
                    status: "not_started",
                    rejectionReason: undefined,
                  }))
                }
                className="mt-4 px-4 py-2 bg-red-400 text-white font-semibold rounded-lg hover:bg-red-500 transition-colors"
              >
                Resubmit Documents
              </button>
            </div>
          </div>
        </motion.div>
      ) : kycState.status === "in_review" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-400/10 border border-blue-400/30 rounded-xl p-6"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-400/20 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6 text-blue-400 animate-spin" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-400 mb-1">
                Verification In Progress
              </h3>
              <p className="text-foreground/70">
                Your documents are being reviewed. This usually takes 1-2 business
                days. We&apos;ll notify you once the review is complete.
              </p>
              {kycState.submittedAt && (
                <p className="text-sm text-foreground/50 mt-2">
                  Submitted on{" "}
                  {new Date(kycState.submittedAt).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Progress Indicator */}
          <div className="bg-foreground/[0.02] border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Upload Progress</h3>
              <span className="text-sm text-foreground/60">
                {uploadedCount} of {requiredCount} required documents
              </span>
            </div>
            <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${(uploadedCount / requiredCount) * 100}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-foreground/[0.02] border border-border rounded-xl p-4">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
              <div className="text-sm text-foreground/70">
                <p className="font-medium text-foreground mb-1">
                  Why do we need verification?
                </p>
                <p>
                  KYC (Know Your Customer) verification is required by financial
                  regulations to prevent fraud and money laundering. Your
                  information is securely encrypted and never shared with third
                  parties.
                </p>
              </div>
            </div>
          </div>

          {/* Document Upload Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {documentTypes.map((doc, index) => {
              const upload = uploads[doc.type];
              const isRequired = doc.type !== "id_back";
              const DocIcon = doc.icon;

              return (
                <motion.div
                  key={doc.type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-foreground/[0.02] border rounded-xl overflow-hidden transition-colors ${upload.status === "uploaded"
                      ? "border-green-400/50"
                      : "border-border"
                    }`}
                >
                  {/* Card Header */}
                  <div className="p-4 border-b border-border">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${upload.status === "uploaded"
                              ? "bg-green-400/10"
                              : "bg-foreground/5"
                            }`}
                        >
                          {upload.status === "uploaded" ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <DocIcon className="w-5 h-5 text-foreground/60" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-semibold">{doc.label}</h4>
                          <p className="text-xs text-foreground/60">
                            {isRequired ? "Required" : "Optional"}
                          </p>
                        </div>
                      </div>
                      {upload.status === "uploaded" && (
                        <button
                          onClick={() => handleRemoveFile(doc.type)}
                          className="p-2 rounded-lg hover:bg-red-400/10 text-foreground/60 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Upload Area */}
                  <div className="p-4">
                    {upload.preview ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-foreground/5">
                        {upload.file?.type.startsWith("image/") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={upload.preview}
                            alt={doc.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-16 h-16 text-foreground/30" />
                            <span className="absolute bottom-2 left-2 text-xs bg-background/80 px-2 py-1 rounded">
                              PDF Document
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => handleDrop(doc.type, e)}
                        className="relative border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-2"
                      >
                        <input
                          ref={(el) => {
                            fileInputRefs.current[doc.type] = el;
                          }}
                          type="file"
                          accept={doc.acceptedFormats}
                          onChange={(e) => handleFileChange(doc.type, e)}
                          className="hidden"
                        />
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          <Upload className="w-6 h-6 text-primary" />
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">
                            Drag & drop your file here
                          </p>
                          <p className="text-sm text-foreground/60">
                            or
                          </p>
                          <button
                            onClick={() => fileInputRefs.current[doc.type]?.click()}
                            className="px-4 py-2 bg-background border border-border rounded-lg text-sm font-semibold hover:bg-muted transition-colors shadow-sm"
                          >
                            Browse Files
                          </button>
                        </div>
                        <p className="text-xs text-foreground/40 mt-2">
                          Max file size: 10MB
                        </p>
                      </div>
                    )}
                    <p className="text-xs text-foreground/50 mt-3">
                      {doc.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Submit Section */}
          <div className="bg-foreground/[0.02] border border-border rounded-xl p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="font-semibold mb-1">Ready to Submit?</h3>
                <p className="text-sm text-foreground/60">
                  {canSubmit()
                    ? "All required documents uploaded. Submit for review."
                    : "Please upload all required documents before submitting."}
                </p>
              </div>
              <button
                onClick={handleSubmit}
                disabled={!canSubmit() || isSubmitting}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit for Verification
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-foreground/[0.02] border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Tips for Successful Verification
            </h3>
            <ul className="space-y-2 text-sm text-foreground/70">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Ensure all four corners of your ID are visible</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Use good lighting and avoid glare or shadows</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  For selfie, hold your ID at face level beside your head
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>
                  Address proof must be dated within the last 3 months
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                <span>Make sure all text on documents is clearly readable</span>
              </li>
            </ul>
          </div>
        </>
      )}

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
            onClick={() => setShowSuccessModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-md bg-background border border-border rounded-2xl shadow-xl p-8 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 bg-green-400/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Documents Submitted!</h2>
              <p className="text-foreground/60 mb-6">
                Your documents have been submitted for review. We&apos;ll notify
                you via email once the verification is complete. This usually
                takes 1-2 business days.
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition-colors"
              >
                Got It
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
