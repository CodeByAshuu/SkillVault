import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink, Eye, Download } from "lucide-react";

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

interface SpecialCertificateProps {
  certificate: Certificate;
  onView: (certificate: Certificate) => void;
}

export function SpecialCertificate({ certificate, onView }: SpecialCertificateProps) {
  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = certificate.downloadUrl;
    link.download = `${certificate.title.replace(/\s+/g, "_")}_Certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Featured Certificate
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Highlighting my most impactful learning achievement
          </p>
        </div>

        {/* Special Certificate Card */}
        <Card className="w-full min-h-[50vh] card-minimal hover-lift hover:border-primary/20 transition-all duration-300">
          <CardContent className="p-8 h-full">
            <div className="grid lg:grid-cols-8 gap-8 lg:gap-12 h-full">
              {/* Left Column - Certificate Image */}
              <div className="lg:col-span-3 flex items-center">
                <div className="relative group w-full">
                  <div className="aspect-[4/3] overflow-hidden shadow-2xl">
                    <img
                      src="/certificates/thumbnails/MERN with Gen AI W3Grads.png"
                      alt="Featured Certificate"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  
                  {/* Floating Platform Badge */}
                  <Badge 
                    variant="default" 
                    className="absolute -top-3 -right-3 text-xs shadow-lg"
                  >
                    W3 Grads
                  </Badge>
                </div>
              </div>

              {/* Right Column - Certificate Details */}
              <div className="lg:col-span-5 space-y-3 flex flex-col justify-center">
                {/* Title and Field */}
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold text-primary mb-2">
                    MERN Stack with GEN AI
                  </h3>
                  <p className="text-lg text-muted-foreground">Web Development</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {["html", "css", "javascript", "reactjs", "expressjs" , "nodejs", "mongodb" , "git", "github", "JWT", "ai integration"].map((tag) => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs hover:bg-primary/10 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* What I Learned */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-primary">
                    What I Learned
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Mastered full-stack web development using the MERN stack (MongoDB, Express.js, React.js, Node.js) 
                    with a focus on integrating Generative AI technologies. 
                    Gained hands-on experience with building scalable web applications, implementing JWT authentication, 
                    and utilizing Git and GitHub for version control. 
                    Learned about AI integration techniques to enhance user experiences in web applications. 
                    SCRUM and Agile methodologies for project management.
                  </p>
                </div>

                {/* Related Projects */}
                <div className="space-y-3">
                  <h4 className="text-lg font-semibold text-primary">
                    Related Projects
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      {"name": "Krush AI", "link": "https://krush-ai.vercel.app/"},
                      {"name": "OpenShelf", "link": "https://openshelf-beige.vercel.app/"}
                    ].map((project) => (
                      <a
                        key={project.name}
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 rounded-lg border border-border/50 hover:border-primary/30 hover:bg-card/30 transition-all group"
                      >
                        <ExternalLink className="w-4 h-4 text-primary group-hover:text-primary/80" />
                        <span className="text-sm text-foreground group-hover:text-primary">
                          {project.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Button
                    onClick={() => onView({
                        id: "special-cert",
                        title: "MERN Stack with Gen Ai",
                        platform: "W3 Grads",
                        field: "Web Development",
                        tags: ["html", "css", "javascript", "reactjs", "expressjs" , "nodejs", "mongodb" , "git", "github", "JWT", "ai integration"],
                        certificateUrl: "/certificates/thumbnails/MERN with Gen AI W3Grads.png",
                        downloadUrl: "/certificates/pdfs/MERN with Gen AI W3Grads.pdf",
                        thumbnailUrl: "/certificates/thumbnails/MERN with Gen AI W3Grads.png",
                        whatILearned: "Advanced data structures (trees, graphs, heaps) and algorithm optimization techniques. Mastered time and space complexity analysis with competitive programming skills.",
                        projects: [
                            {"name": "Algorithm Visualizer", "link": "https://github.com/user/algo-visualizer"},
                            {"name": "Competitive Programming Solutions", "link": "https://github.com/user/cp-solutions"}
                        ]
                    })}
                    className="flex-1 sm:flex-none"
                    size="lg"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Certificate
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    className="flex-1 sm:flex-none"
                    size="lg"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}