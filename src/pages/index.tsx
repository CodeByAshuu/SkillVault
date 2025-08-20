import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, Mail, Award, Code, Zap } from "lucide-react";
import { CertificateCard } from "@/components/CertificateCard";
import { FilterBar } from "@/components/FilterBar";
import { CertificateModal } from "@/components/CertificateModal";
import certificatesData from "@/data/certificates.json";
// import heroImage from "@/assets/hero-bg.jpg";
import SplashCursor from '@/components/SplashCursor';

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

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const certificates = certificatesData as Certificate[];

  // Filter and search certificates
  const filteredCertificates = useMemo(() => {
    return certificates.filter(cert => {
      const matchesSearch = searchQuery === "" || 
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.platform.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.field.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesFilters = activeFilters.length === 0 ||
        activeFilters.some(filter => 
          cert.platform === filter ||
          cert.field === filter ||
          cert.tags.includes(filter)
        );

      return matchesSearch && matchesFilters;
    });
  }, [certificates, searchQuery, activeFilters]);

  const handleViewCertificate = (certificate: Certificate) => {
    setSelectedCertificate(certificate);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCertificate(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <SplashCursor />
      <section className="relative min-h-screen flex items-center justify-center wave-bg">
        {/* Floating dots */}
        {/* <div className="floating-dots">
          <div className="floating-dot" style={{ left: '10%', animationDelay: '0s' }}></div>
          <div className="floating-dot" style={{ left: '20%', animationDelay: '1s' }}></div>
          <div className="floating-dot" style={{ left: '80%', animationDelay: '2s' }}></div>
          <div className="floating-dot" style={{ left: '90%', animationDelay: '3s' }}></div>
        </div> */}
        
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="animate-fade-in">            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 typing-cursor">
              <span className="text-primary">Skill</span>
              <span className="text-foreground">Vault</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              A curated collection of my professional certificates and learning journey
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="lg" className="text-lg px-8">
                <Award className="w-5 h-5 mr-2" />
                View Certificates
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Code className="w-5 h-5 mr-2" />
                See Projects
              </Button>
            </div>
            
            <div className="flex justify-center gap-6">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/CodeByAshuu" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/sagarrrr/" },
                { icon: Mail, label: "Email", href: "https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsmHbFSZFjqrcBCsnWpdTFJnvJZHKhgHtTBvSXplBqGQhsGSqLwScxhcbQWPHtxMVcsdQkBB" }
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg bg-card border border-border hover:bg-accent transition-all duration-300 hover:scale-110"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            My Certificate Collection
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {certificates.length} verified certificates across multiple domains and platforms
          </p>
        </div>

        {/* Filter Bar */}
        <FilterBar
          onSearch={setSearchQuery}
          onFilterChange={setActiveFilters}
          certificates={certificates}
        />

        {/* Results Counter */}
        <div className="text-center mb-8">
          <Badge variant="outline" className="text-lg px-4 py-2">
            {filteredCertificates.length} certificate{filteredCertificates.length !== 1 ? 's' : ''} found
          </Badge>
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCertificates.map((certificate, index) => (
            <div
              key={certificate.id}
              style={{ animationDelay: `${index * 0.1}s` }}
              className="animate-scale-in"
            >
              <CertificateCard
                certificate={certificate}
                onView={handleViewCertificate}
              />
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCertificates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-semibold mb-2">No certificates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters
            </p>
          </div>
        )}
      </section>


      {/* Contact Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-primary">
            Let's Connect
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Interested in collaborating or discussing opportunities? Reach out!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="https://mail.google.com/mail/u/0/#inbox?compose=DmwnWsmHbFSZFjqrcBCsnWpdTFJnvJZHKhgHtTBvSXplBqGQhsGSqLwScxhcbQWPHtxMVcsdQkBB">
                <Mail className="w-5 h-5 mr-2" />
                Get In Touch
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="https://github.com/CodeByAshuu/SkillVault" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                View GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Certificate Modal */}
      <CertificateModal
        certificate={selectedCertificate}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default Index;
