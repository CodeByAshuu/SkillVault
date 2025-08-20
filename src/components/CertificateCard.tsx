import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

interface Project {
  name: string;
  link: string;
}

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
  projects: Project[];
}

interface CertificateCardProps {
  certificate: Certificate;
  onView: (certificate: Certificate) => void;
}

export function CertificateCard({ certificate, onView }: CertificateCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = certificate.downloadUrl;
    link.download = `${certificate.title.replace(/\s+/g, "_")}_Certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="group card-minimal hover-lift hover:border-primary/20 transition-all duration-300 animate-fade-in">
      <CardContent className="p-0">
        {/* Certificate Thumbnail */}
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={certificate.thumbnailUrl}
            alt={certificate.title}
            className="w-full h-76 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          {/* Platform Badge */}
          <Badge className="absolute top-3 right-3 bg-card border border-border">
            {certificate.platform}
          </Badge>
        </div>

        <div className="p-6 space-y-4">
          {/* Title and Field */}
          <div>
            <h3 className="text-lg font-semibold text-primary mb-1">
              {certificate.title}
            </h3>
            <p className="text-sm text-muted-foreground">{certificate.field}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {certificate.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {certificate.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{certificate.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={() => onView(certificate)}
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-2" />
              View
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
          </div>

          {/* Expandable Details */}
          <div className="border-t border-border/50 pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full justify-between text-muted-foreground hover:text-foreground"
            >
              What I Learned
              {showDetails ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </Button>

            {showDetails && (
              <div className="mt-4 space-y-4 animate-slide-up">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {certificate.whatILearned}
                </p>

                {certificate.projects.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2 text-primary">
                      Related Projects:
                    </h4>
                    <div className="space-y-2">
                      {certificate.projects.map((project) => (
                        <a
                          key={project.name}
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {project.name}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}