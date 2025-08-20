import{
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, ExternalLink, X } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  platform: string;
  field: string;
  tags: string[];
  certificateUrl: string;
  downloadUrl: string;
  thumbnailUrl: string;
  whatILearned: string;
  projects: Array<{ name: string; link: string }>;
}

interface CertificateModalProps {
  certificate: Certificate | null;
  isOpen: boolean;
  onClose: () => void;
}

export function CertificateModal({ certificate, isOpen, onClose }: CertificateModalProps) {
  if (!certificate) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = certificate.downloadUrl;
    link.download = `${certificate.title.replace(/\s+/g, "_")}_Certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] glass border-primary/20 overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-gradient-primary">
            {certificate.title}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Certificate Preview */}
          <div className="relative rounded-lg overflow-hidden glow-primary">
            <img
              src={certificate.thumbnailUrl}
              alt={certificate.title}
              className="w-full h-120 md:h-98 object-cover"
            />
            {/* <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" /> */}
          </div>

          {/* Certificate Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-accent mb-2">Platform</h3>
                <Badge variant="secondary" className="text-sm">
                  {certificate.platform}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold text-accent mb-2">Field</h3>
                <Badge variant="outline" className="text-sm">
                  {certificate.field}
                </Badge>
              </div>

              <div>
                <h3 className="font-semibold text-accent mb-2">Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {certificate.tags.map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-accent mb-3">What I Learned</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {certificate.whatILearned}
                </p>
              </div>

              {certificate.projects.length > 0 && (
                <div>
                  <h3 className="font-semibold text-accent mb-3">Related Projects</h3>
                  <div className="space-y-2">
                    {certificate.projects.map(project => (
                      <a
                        key={project.name}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-primary hover:text-primary-glow transition-colors group"
                      >
                        <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform" />
                        {project.name}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4 border-t border-border/50">
            <Button
              variant="hero"
              onClick={handleDownload}
              className="flex-1"
            >
              <Download className="w-4 h-4" />
              Download Certificate
            </Button>
            <Button
              variant="glass"
              onClick={onClose}
              className="flex-1"
            >
              <X className="w-4 h-4" />
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}